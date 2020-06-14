var express = require("express")
var path = require("path")
var fs = require("fs")

var PORT = process.env.PORT || 8088

var app = express()

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(express.static('public'))

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", function (err, data) {
        if (err) throw err;
        var notesJSON = JSON.parse(data)
        console.log(notesJSON)
        return res.json(notesJSON)
    })
});

app.post("/api/notes", function (req, res) {
    // console.log(req)
    var newNote = req.body
    console.log(newNote)
    fs.appendFile("./db/db.json", newNote + '\n', function (err, data) {
        if (err) throw err;
        // console.log(data) // undefined
    })
    return res.json(newNote)

})

app.delete("/api/notes/:id", function (req, res) {
    var chosen = req.params.id;
    console.log(chosen);
})

app.listen(PORT, function () {
    console.log("Server is listening on http://localhost:" + PORT)
})

// questions: 
// when to use return res.json()