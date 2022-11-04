//variable declarations
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const mysql = require('mysql');
const Joi = require('joi');

//front end
app.use('/', express.static('static'));

app.use(express.json());

//my sql connection to local database
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "!bl3ach34yr%",
    database: "playlistdb"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("database is up and running!! ('-'*ゞ");
});

//using csv parser
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


//delete a playlist (backend functionality #9)
app.delete("/deletePlaylist/:playlistBox", function (req, res) {
    con.query("DROP TABLE ??", [req.params.playlistBox], (err) => (console.log(err)));
    res.json("deleted" + playlistBox);
});

//post request to create a playlist table in my sql database(backend functionality #6)
app.post("/makePlaylist", function (req, res) {
    //input sanitization
    const playlistName = req.body.playlistName;
    const schema = Joi.object({
        playlistName: Joi.string().required()
    });
    const validate = schema.validate(req.body);
    if (validate.error) {
        res.status(400);
        return;
    }


    con.query(`CREATE TABLE ?? (
        albumID VARCHAR(45) NULL,
        albumTitle VARCHAR(45) NULL,
        artistID VARCHAR(45) NULL,
        artistName VARCHAR(45) NULL,
        trackDuration VARCHAR(45) NULL,
        trackID VARCHAR(45) NOT NULL,
        trackNum VARCHAR(45) NULL,
        trackTitle VARCHAR(45) NULL,
        trackGenres VARCHAR(5000) NULL,
        PRIMARY KEY (trackID)) CHARSET=utf8mb4;`, [playlistName], (err, data) => {
        console.log(err);
        if (err) {
            if (err.code === 'ER_TABLE_EXISTS_ERROR') {
                res.json("ER_TABLE_EXISTS_ERROR");
            }
            else {
                res.json(`table ${playlistName} made`);
            }
        }
        else {
            res.json(`table ${playlistName} made`);
        }
    })
});

//reset playlist
app.put("/truncatePlaylist/:playlistBox", function (req, res) {
    con.query("TRUNCATE TABLE ??;", [req.params.playlistBox], (err) => (console.log(err)));
    
});

//save a list of track ID's to a given list name (backend functionality #7) 
app.put("/playlist/:playlistBox", function (req, res) {

    con.query("INSERT INTO ?? VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [req.params.playlistBox, req.body.albumID, req.body.albumTitle, req.body.artistID, req.body.artistName, req.body.trackDuration, req.body.trackID, req.body.trackNumber,
        req.body.trackTitle, req.body.trackGenres], (err) => (console.log(err)));
    res.json('added to db');
})

app.get("/loadPlaylist", function (req, res) {
    con.query("SELECT * FROM ??", [req.query.playlist], (req, data) =>
        res.json(data))
})


app.get("/getPlaylist", function (req, res) {
    con.query("SELECT TABLE_NAME from INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA = 'playlistdb';", (err, data) => {
        res.send(data);
    });
});





//get all matching artist details given an artist ID (backend functionality #2)
app.get('/artist/:id', function (req, res) {
    const schema = Joi.object({
        id: Joi.number().required()
    });
    const validate = schema.validate({ id: parseInt(req.params.id) });
    if (validate.error) {
        res.status(400);
        return;
    }


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
//gets the first n number of matching track ID's (backend functionality #3)
app.get('/track/:id', function (req, res) {
    const schema = Joi.object({
        id: Joi.number().required()
    });
    const validate = schema.validate({ id: parseInt(req.params.id) });
    if (validate.error) {
        res.status(400);
        return;
    }


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
    json.trackID = trackID.track_id;

    res.json(json);

});

//backend functionality #5 get artist ID's for all artist name search + more for frontend display, 
app.get('/artist', function (req, res) {
    const schema = Joi.object({
        artistInputName: Joi.string().required()
    });
    const validate = schema.validate(req.query);
    if (validate.error) {
        res.status(400);
        return;
    }


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

//backend functionality #4 cont, search by album
app.get('/album', function (req, res) {
    const schema = Joi.object({
        albumInputName: Joi.string().required()
    });
    const validate = schema.validate(req.query);
    if (validate.error) {
        res.status(400);
        return;
    }
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


//get the first n number of track ID's for track title ( backend functionality #4)
app.get('/trackName', function (req, res) {
    const schema = Joi.object({
        trackInputName: Joi.string().required()
    });
    const validate = schema.validate(req.query);
    if (validate.error) {
        res.status(400);
        return;
    }



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