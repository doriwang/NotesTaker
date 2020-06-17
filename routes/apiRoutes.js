const router = require("express").Router();
var fs = require("fs");
const uuidv1 = require("uuidv1");

router.get("/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        var notesJSON = [].concat(JSON.parse(data));
        return res.json(notesJSON);
    });
});

router.post("/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        var notesJSON = [].concat(JSON.parse(data));
        var newNote = req.body;
        newNote.id = uuidv1();
        notesJSON.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notesJSON) + "\n", function (
            err
        ) {
            if (err) throw err;
        });
        return res.json(notesJSON);
    });
});

router.delete("/notes/:id", function (req, res) {
    var chosen = req.params.id;
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        var notesJSON = [].concat(JSON.parse(data));
        var filteredNotes = notesJSON.filter(function (note) {
            return note.id !== chosen
        })
        fs.writeFile("./db/db.json", JSON.stringify(filteredNotes) + "\n", function (
            err
        ) {
            if (err) throw err;
        });
        res.json(filteredNotes);
    })
});

module.exports = router;