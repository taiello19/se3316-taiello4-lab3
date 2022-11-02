const artistSearch = document.getElementById("artistSearch");
const trackSearch = document.getElementById("trackSearch");
const albumSearch = document.getElementById("albumSearch");


trackSearch.addEventListener('submit', function (e) {
    //prevent refresh page
    e.preventDefault();

    const track = document.getElementById("trackInput").value;

    fetch("http://localhost:3000/trackName?trackInputName=" + track, { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => {
            res.text()
        })
        .then(data => {
            console.log(data)
            document.getElementById("display");
        })
        .catch(err => console.log(err));
});

artistSearch.addEventListener('submit', function (e) {
    //prevent refresh page
    e.preventDefault();

    const track = document.getElementById("trackInput").value;

    fetch("http://localhost:3000/artist?artistInputName=" + track, { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => {

            res.text()
        })
        .then(data => {

            console.log(data)
            document.getElementById("display");
        })
        .catch(err => console.log(err));
});





