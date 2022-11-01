const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

//front end
app.use('/', express.static('static'));

app.use(express.json());

var csv = require("csv-parser");
var fs = require("fs");
var genresArray = [];
var albumArray = [];
var artistArray = [];
var trackArray = [];
fs.createReadStream("lab3-data/genres.csv").pipe(csv({})).on("data", (data) => genresArray.push(data)).on("end", () => {/*console.log(genresArray)*/});
fs.createReadStream("lab3-data/raw_tracks.csv").pipe(csv({})).on("data", (data) => trackArray.push(data)).on("end", () => {/*console.log(trackArray)*/});
fs.createReadStream("lab3-data/raw_artists.csv").pipe(csv({})).on("data", (data) => artistArray.push(data)).on("end", () => {/*console.log(artistArray)*/});
fs.createReadStream("lab3-data/raw_albums.csv").pipe(csv({})).on("data", (data) => albumArray.push(data)).on("end", () => {/*console.log(albumArray)*/});


app.get('/trackName', function(req, res){
    res.send('You sent this to the server:' + req.query.trackInputName);
    
});

app.get('/artist/:id', function(req, res){
    const artistID = artistArray.find(element => element.artist_id == req.params.id);
    const json = {};
    json.name = artistID.artist_handle;
    json.yearStart = artistID.artist_active_year_begin;
    json.yearEnd = artistID.artist_active_year_end;
    json.favs = artistID.artist_favorites;
    json.location = artistID.artist_location;
    json.website = artistID.artist_website;
    
    res.send(json);
});

app.get('/track/:id', function(req, res){
    const trackID = trackArray.find(element => element.track_id == req.params.id);
    const json = {};
    json.albumID = trackID.album_id;
    json.albumTitle = trackID.album_title;
    json.artistID = trackID.artist_id;
    json.artistName = trackID.artist_name;
    json.tags = trackID.tags;
    json.dateCreated = trackID.track_date_created;
    json.dateRecorded = trackID.track_date_recorded;
    json.trackDuration = trackID.track_duration;
    json.trackGenres = trackID.track_genres;
    json.trackNumber = trackID.track_number;
    json.trackTitle = trackID.track_title;

    res.send(json);

});






app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});