const artistSearch = document.getElementById("artistSearch");
const trackSearch = document.getElementById("trackSearch");
const albumSearch = document.getElementById("albumSearch");


trackSearch.addEventListener('submit', function (e) {
    //prevent refresh page
    e.preventDefault();

    const track = document.getElementById("trackInput").value;
    console.log(track);

    fetch("http://localhost:3000/trackName?trackInputName=" + track, { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
});

artistSearch.addEventListener('submit', function (e) {
    //prevent refresh page
    e.preventDefault();

    const artist = document.getElementById("artistInput").value;

    fetch("http://localhost:3000/artist?artistInputName=" + artist, { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
});

albumSearch.addEventListener('submit', function (e) {
    //prevent refresh page
    e.preventDefault();

    const album = document.getElementById("albumInput").value;

    fetch("http://localhost:3000/album?albumInputName=" + album, { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
});




