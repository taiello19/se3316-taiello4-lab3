const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "!bl3ach34yr%",
    database: "playlistdb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  





































//front end
app.use('/', express.static('static'));

app.use(express.json());

var csv = require("csv-parser");
var fs = require("fs");
var genresArray = [];
var albumArray = [];
var artistArray = [];
var trackArray = [];
fs.createReadStream("lab3-data/genres.csv").pipe(csv({})).on("data", (data) => genresArray.push(data)).on("end", () => {/*console.log(genresArray)*/ });
fs.createReadStream("lab3-data/raw_tracks.csv").pipe(csv({})).on("data", (data) => trackArray.push(data)).on("end", () => {/*console.log(trackArray)*/ });
fs.createReadStream("lab3-data/raw_artists.csv").pipe(csv({})).on("data", (data) => artistArray.push(data)).on("end", () => {/*console.log(artistArray)*/ });
fs.createReadStream("lab3-data/raw_albums.csv").pipe(csv({})).on("data", (data) => albumArray.push(data)).on("end", () => {/*console.log(albumArray)*/ });




app.get('/artist/:id', function (req, res) {
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

app.get('/track/:id', function (req, res) {
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

app.get('/artist', function (req, res) {
    const newArray = artistArray.filter(function (element) {
        if (this.count < 25 && element.artist_handle.toString().toLowerCase().includes(req.query.artistInputName)) {
            this.count++;
            return true;
        }
        return false;
    }, { count: 0 });

    let updateArray = [];
    for (i = 0; i < newArray.length; i++) {
        const json = {
            artistID: newArray[i].artist_id,
            artistContact: newArray[i].artist_contact,
            artistDateCreated: newArray[i].artist_date_created,
            artistMembers: newArray[i].artist_members,
            artistFavorites: newArray[i].artist_favorites,
            artistHandle: newArray[i].artist_handle,
            artistLocation: newArray[i].artist_location,
            artistWebsite: newArray[i].artist_website,
        }
        updateArray.push(json);

    }

    res.send(updateArray);

});

app.get('/album', function (req, res) {
    const newArray = trackArray.filter(function (element) {
        if (this.count < 25 && element.album_title.toString().toLowerCase().includes(req.query.albumInputName)) {
            this.count++;
            return true;
        }
        return false;
    }, { count: 0 });

    let updateArray = [];
    for (i = 0; i < newArray.length; i++) {
        const json = {
            albumID: newArray[i].album_id,
            albumTitle: newArray[i].album_title,
            artistID: newArray[i].artist_id,
            artistName: newArray[i].artist_name,
            tags: newArray[i].tags,
            dateCreated: newArray[i].track_date_created,
            dateRecorded: newArray[i].track_date_recorded,
            trackDuration: newArray[i].track_duration,
            trackGenres: newArray[i].track_genres,
            trackNumber: newArray[i].track_number,
            trackTitle: newArray[i].track_title,
            trackID: newArray[i].track_id,
        }
        updateArray.push(json);

    }

    res.send(updateArray);

});

app.get('/trackName', function (req, res) {
    const newArray = trackArray.filter(function (element) {
        if (this.count < 25 && element.track_title.toString().toLowerCase().includes(req.query.trackInputName)) {
            this.count++;
            return true;
        }
        return false;
    }, { count: 0 });

    let updateArray = [];
    for (i = 0; i < newArray.length; i++) {
        const json = {
            albumID: newArray[i].album_id,
            albumTitle: newArray[i].album_title,
            artistID: newArray[i].artist_id,
            artistName: newArray[i].artist_name,
            tags: newArray[i].tags,
            dateCreated: newArray[i].track_date_created,
            dateRecorded: newArray[i].track_date_recorded,
            trackDuration: newArray[i].track_duration,
            trackGenres: newArray[i].track_genres,
            trackNumber: newArray[i].track_number,
            trackTitle: newArray[i].track_title,
            trackID: newArray[i].track_id,
        }
        updateArray.push(json);

    }
    
    res.send(updateArray);


});






app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});