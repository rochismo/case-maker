const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const loader = require("./service/loader.js");
const app = express();

const port = 3000;

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
    res.render("index", {cases: loader.getCases()})
})

app.listen(port, () => {
    console.log(`Listening @ http://localhost:${port}`);
})