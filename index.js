const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const loader = require("./service/loader.js");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const port = 3000;
const connections = [];
// Sets
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('json spaces', 40);

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

app.get("/get-posts", function(req, res) {
    const data = require("./cases.json");
    res.json(data);
})

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
    res.redirect("/");
    res.render("index", {cases: loader.getCases()})
})

io.sockets.on("connection", function(sock) {
    connections.push(sock);
    console.log(`${connections.length} sockets on`);

    sock.on("disconnect", function(data) {
        connections.splice(connections.indexOf(sock), 1);
        console.log(`Disconnected: ${connections.length} sockets on`);
    });

    sock.on("post", function() {
        io.sockets.emit("render", {log: "Added new post"});
    })
})

server.listen(port, () => {
    console.log(`Listening @ http://localhost:${port}`);
})