const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const loader = require("./service/loader.js");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const port = 3000;
const ip = "172.16.7.228";
const connections = [];
const users = {};
// Sets
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('json spaces', 40);

function render() {
    io.sockets.emit("render", {
        posts: require("./cases.json")
    });

    io.sockets.emit("clearAll");
}

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index", {
        cases: loader.getCases()
    });
})

app.get("/get-posts", function (req, res) {
    const data = require("./cases.json");
    res.json(data);
});

app.post("/add", (req, res) => {
    let {
        id,
        lastId,
        name,
        prior,
        desc,
        actors,
        precon,
        starter,
        flow,
        postcon,
        notes
    } = req.body;
    loader.addCase({
        id,
        name,
        prior,
        desc,
        actors,
        precon,
        starter,
        flow,
        postcon,
        notes,
        lastId
    });
    render();
    res.redirect("/");
})

app.get("/chat", function(req, res) {
    res.render("chat");
})

io.sockets.on("connection", function(sock) {
    connections.push(sock);

    sock.on("disconnect", function (data) {
        connections.splice(connections.indexOf(sock), 1);
        io.sockets.emit("removeUser", sock.id);
        console.log(`Disconnected: ${connections.length} sockets on`);
    });
    sock.on("post", render);

    sock.on("edit", function (data) {
        io.sockets.emit("editing", data);
    })

    sock.on("remove", function (data) {
        io.sockets.emit("clear", data);
    })

    sock.on("newUser", function({userName}) {
        if (users[userName]) return
        users[userName] = {socket: sock.id};
        io.sockets.emit("updateUsers", {users, userName});
    })
    sock.on("newMsg", function(message) {
        io.sockets.emit("renderMsg", message);
    })
})

server.listen(port, ip, () => {
    const p = server.address().port;
    const a = server.address().address
    console.log(`Listening @ http://${a}:${p}`);
})//