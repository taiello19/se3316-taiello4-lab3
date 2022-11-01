const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

//front end
app.use('/', express.static('static'));

app.use(express.json());

var csv = require("csv-parser");
var fs = require("fs");
var genresRes = [];
var albumRes = [];
var artistRes = [];
var trackRes = [];
fs.createReadStream("lab3-data/genres.csv").pipe(csv({})).on("data", (data) => genresRes.push(data)).on("end", () => {/*console.log(genresRes)*/});
fs.createReadStream("lab3-data/raw_tracks.csv").pipe(csv({})).on("data", (data) => trackRes.push(data)).on("end", () => {/*console.log(trackRes)*/});
fs.createReadStream("lab3-data/raw_artists.csv").pipe(csv({})).on("data", (data) => artistRes.push(data)).on("end", () => {/*console.log(artistRes)*/});
fs.createReadStream("lab3-data/raw_albums.csv").pipe(csv({})).on("data", (data) => albumRes.push(data)).on("end", () => {/*console.log(albumRes)*/});


app.get('/trackName', function(req, res){
    res.send('You sent this to the server:' + req.query.trackInputName);
    
});



app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});