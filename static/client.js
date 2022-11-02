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
        .then(function (data) {
            let div = document.getElementById("divTbl");

            if (div.hasChildNodes()) {
                document.getElementById('table').remove();
            }
            const table = document.createElement("table");
            table.id = "table";
            table.className = "table";

            div.appendChild(table);

            let namesRow = document.createElement("tr");
            table.appendChild(namesRow);

            let header1 = document.createElement("th");
            header1.appendChild(document.createTextNode("albumID"));

            let header2 = document.createElement("th");
            header2.appendChild(document.createTextNode("albumTitle"));

            let header3 = document.createElement("th");
            header3.appendChild(document.createTextNode("artistID"));

            let header4 = document.createElement("th");
            header4.appendChild(document.createTextNode("artistName"));

            let header5 = document.createElement("th");
            header5.appendChild(document.createTextNode("trackDur"));

            let header6 = document.createElement("th");
            header6.appendChild(document.createTextNode("trackID"));

            let header7 = document.createElement("th");
            header7.appendChild(document.createTextNode("track#"));

            let header8 = document.createElement("th");
            header8.appendChild(document.createTextNode("trackTitle"));

            namesRow.appendChild(header1);
            namesRow.appendChild(header2);
            namesRow.appendChild(header3);
            namesRow.appendChild(header4);
            namesRow.appendChild(header5);
            namesRow.appendChild(header6);
            namesRow.appendChild(header7);
            namesRow.appendChild(header8);

            for (j = 0; j < data.length; j++) {
                const dataRow = document.createElement('tr');
                table.appendChild(dataRow);


                let tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].albumID));
                dataRow.appendChild(tData);


                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].albumTitle));
                dataRow.appendChild(tData);


                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].artistID));
                dataRow.appendChild(tData);


                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].artistName));
                dataRow.appendChild(tData);

                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].trackDuration));
                dataRow.appendChild(tData);

                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].trackID));
                dataRow.appendChild(tData);

                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].trackNumber));
                dataRow.appendChild(tData);

                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].trackTitle));
                dataRow.appendChild(tData);

            }

        })
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




