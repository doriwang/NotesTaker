var express = require("express")
var apiRoutes = require("./routes/apiRoutes")
var htmlRoutes = require("./routes/htmlRoutes")

var PORT = process.env.PORT || 8088

var app = express()

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(express.static('public'))
app.use("/api", apiRoutes)
app.use("/", htmlRoutes)

app.listen(PORT, function () {
    console.log("Server is listening on http://localhost:" + PORT)
})

// questions: 
// when to use return res.json()