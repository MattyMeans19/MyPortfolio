import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true }));

app.use(express.static("public"));


app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.get("/skills", (req,res) => {
    res.render("skills.ejs", {display: ""});
});

app.get("/resume", (req,res) => {
    res.render("resume.ejs");
});

app.get("/about", (req,res) => {
    res.render("about.ejs");
});

app.get("/contact", (req,res) => {
    res.render("contact.ejs");
});

app.get("/rps", (req,res) =>{
    res.render("rps.ejs");
});


app.post("/skillsModule", (req,res) =>{
    let selected = req.body.display;
    res.render("skills.ejs", {display: selected});
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });