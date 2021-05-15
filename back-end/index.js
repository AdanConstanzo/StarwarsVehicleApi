const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Promise = require("bluebird");

const app = express();

const people = require("./routes/people");
const starship = require("./routes/starships");
const film = require("./routes/films");

const port = process.env.PORT || 8081;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:"+port);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/starwars", { useMongoClient: true });


app.use("/api/people", people);
app.use("/api/starship", starship);
app.use("/api/film", film);



app.listen(port, () => {
    console.log(`Running on localhost:${port}`);
});
