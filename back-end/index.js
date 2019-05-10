import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Promise from "bluebird";

const app = express();

import people from "./routes/people";
import starship from "./routes/starships";
import film from "./routes/films";


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/starwars", { useMongoClient: true });


app.use("/api/people", people);
app.use("/api/starship", starship);
app.use("/api/film", film);


app.listen(8088, () => {
    console.log("Running on localhost:8088");
});
