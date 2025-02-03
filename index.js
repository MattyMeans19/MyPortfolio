import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1/";

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

app.get("/lyriquery", (req,res) =>{
    res.render("lyriquery.ejs");
});


app.post("/skillsModule", (req,res) =>{
    let selected = req.body.display;
    res.render("skills.ejs", {display: selected});
});

app.post("/search", async (req,res) => {
    let searchArtist = req.body["artist"];
    let searchSong = req.body["song"];
    try{
        const response = await axios.get(API_URL + searchArtist + "/" + searchSong);
        const result = response.data;
        var lineAdjust= result.lyrics.replace(/\n/g, "<br>");
        res.render("lyriquery.ejs", {lyrics: lineAdjust, artist:searchArtist , song:searchSong});
    } catch(error){
        console.log("error")
        res.render("lyriquery.ejs", {lyrics: "No Match Found, Try Again."});
    }
  });


app.listen(process.env.PORT || port);
