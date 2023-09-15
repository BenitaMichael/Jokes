import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API = "https://v2.jokeapi.dev/joke/"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.ejs", {content: "Let's get you a good laugh"})
});

app.post("/submit", async (req, res)=>{
    try{
        const response = await axios.get(API + req.body.category)
        const result = response.data;
        res.render("index.ejs", {
            content: "HAHA! Got you",
            joke: result
        })

    }catch(error){
        console.log(error.message)
        res.render("index.ejs", {
            error: `${res.status}`
        })
    }
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})