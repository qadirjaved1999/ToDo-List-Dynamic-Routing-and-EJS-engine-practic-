const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

// Set up EJS Engine
app.set("view engine", "ejs");

// Form Data handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", function (req, res) {
    // For read directory files exist or not
    fs.readdir(`./files`, function (err, files) {
        res.render("index", { files: files });
    });
});

app.get("/file/:filename", function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', function (err, fileData) {
        res.render("show", { filename: req.params.filename, fileData: fileData });
    });
});

app.get("/edit/:filename", function (req, res) {
    res.render("edit", {filename: req.params.filename}); 
});

app.post("/edit", function (req, res) {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err){
        if (err) throw err;
        res.redirect("/")
    })
    // console.log("======>>>>>>",req.body)
});

app.post("/create", function (req, res) {
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.task.split(' ').join('')}.txt`, req.body.description, function (err) {
        if (err) throw err;
        res.redirect("/");
    });

});

app.listen(3000);