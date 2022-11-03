const artistSearch = document.getElementById("artistSearch");
const trackSearch = document.getElementById("trackSearch");
const albumSearch = document.getElementById("albumSearch");

// window.onload = loadPlaylist;




const listText = document.getElementById("listName");
listText.addEventListener('submit', function (e) {
    //prevent refresh page
    e.preventDefault();
    const playlistName = document.getElementById("listInput").value;

    //add to sqlDatabase here
    fetch("http://" + window.location.host + "/makePlaylist", { method: 'POST', body: JSON.stringify({ "playlistName": playlistName }), headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(function (data) { 
            const selection = document.getElementById("playlistBox");
            const options = document.createElement("option");
            options.appendChild(document.createTextNode(playlistName.toString()));
            selection.appendChild(options);

        })
        .catch(err => console.log(err))
});



trackSearch.addEventListener('submit', function (e) {
    //prevent refresh page
    e.preventDefault();

    const track = document.getElementById("trackInput").value;

    fetch("http://" + window.location.host + "/trackName?trackInputName=" + track, { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(function (data) {

            let div = document.getElementById("divTbl");

            if (div.hasChildNodes()) {
                document.getElementById('table').remove();
                document.getElementById('h1').remove();
            }
            const table = document.createElement("table");
            table.id = "table";
            table.className = "table";

            const topText = document.createElement("h1");
            topText.id = "h1";
            topText.appendChild(document.createTextNode(`Searching by Track Name: ${track}`));
            div.appendChild(topText);

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
            header5.appendChild(document.createTextNode("trackDuration"));

            let header6 = document.createElement("th");
            header6.appendChild(document.createTextNode("trackID"));

            let header7 = document.createElement("th");
            header7.appendChild(document.createTextNode("track#"));

            let header8 = document.createElement("th");
            header8.appendChild(document.createTextNode("trackTitle"));

            let header9 = document.createElement("th");
            header8.appendChild(document.createTextNode("trackGenres"));

            namesRow.appendChild(header1);
            namesRow.appendChild(header2);
            namesRow.appendChild(header3);
            namesRow.appendChild(header4);
            namesRow.appendChild(header5);
            namesRow.appendChild(header6);
            namesRow.appendChild(header7);
            namesRow.appendChild(header8);
            namesRow.appendChild(header9);

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

                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].trackGenres));
                dataRow.appendChild(tData);

            }

        })
        .catch(err => console.log(err))
});

artistSearch.addEventListener('submit', function (e) {
    //prevent refresh page
    e.preventDefault();

    const artist = document.getElementById("artistInput").value;


    fetch("http://" + window.location.host + "/artist?artistInputName=" + artist, { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(function (data) {
            let div = document.getElementById("divTbl");

            if (div.hasChildNodes()) {
                document.getElementById('table').remove();
                document.getElementById('h1').remove();
            }
            const table = document.createElement("table");
            table.id = "table";
            table.className = "table";

            const topText = document.createElement("h1");
            topText.id = "h1";
            topText.appendChild(document.createTextNode(`Searching by Artist Name: ${artist}`));
            div.appendChild(topText);

            div.appendChild(table);

            let namesRow = document.createElement("tr");
            table.appendChild(namesRow);

            let header1 = document.createElement("th");
            header1.appendChild(document.createTextNode("artistID"));

            let header2 = document.createElement("th");
            header2.appendChild(document.createTextNode("artistHandle"));

            let header3 = document.createElement("th");
            header3.appendChild(document.createTextNode("artistDateCreated"));

            let header4 = document.createElement("th");
            header4.appendChild(document.createTextNode("artistLocation"));

            let header5 = document.createElement("th");
            header5.appendChild(document.createTextNode("artistMembers"));

            let header6 = document.createElement("th");
            header6.appendChild(document.createTextNode("artistWebsite"));

            let header7 = document.createElement("th");
            header7.appendChild(document.createTextNode("artistContact"));

            let header8 = document.createElement("th");
            header8.appendChild(document.createTextNode("artistFavorites"));

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
                tData.appendChild(document.createTextNode(data[j].artistID));
                dataRow.appendChild(tData);


                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].artistHandle));
                dataRow.appendChild(tData);


                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].artistDateCreated));
                dataRow.appendChild(tData);


                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].artistLocation));
                dataRow.appendChild(tData);

                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].artistMembers));
                dataRow.appendChild(tData);

                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].artistWebsite));
                dataRow.appendChild(tData);

                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].artistContact));
                dataRow.appendChild(tData);

                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].artistFavorites));
                dataRow.appendChild(tData);

            }

        })
        .catch(err => console.log(err))
});

albumSearch.addEventListener('submit', function (e) {
    //prevent refresh page
    e.preventDefault();

    const album = document.getElementById("albumInput").value;

    fetch("http://" + window.location.host + "/album?albumInputName=" + album, { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(function (data) {
            let div = document.getElementById("divTbl");

            if (div.hasChildNodes()) {
                document.getElementById('table').remove();
                document.getElementById('h1').remove();
            }
            const table = document.createElement("table");
            table.id = "table";
            table.className = "table";

            const topText = document.createElement("h1");
            topText.id = "h1";
            topText.appendChild(document.createTextNode(`Searching by Album Name: ${album}`));
            div.appendChild(topText);

            div.appendChild(table);

            let namesRow = document.createElement("tr");
            table.appendChild(namesRow);

            let header1 = document.createElement("th");
            header1.appendChild(document.createTextNode("albumID"));

            let header2 = document.createElement("th");
            header2.appendChild(document.createTextNode("albumTitle"));

            let header3 = document.createElement("th");
            header3.appendChild(document.createTextNode("artistName"));

            let header4 = document.createElement("th");
            header4.appendChild(document.createTextNode("trackDuration"));

            let header5 = document.createElement("th");
            header5.appendChild(document.createTextNode("trackID"));

            let header6 = document.createElement("th");
            header6.appendChild(document.createTextNode("trackNumber"));

            let header7 = document.createElement("th");
            header7.appendChild(document.createTextNode("trackTitle"));

            let header8 = document.createElement("th");
            header8.appendChild(document.createTextNode("dateCreated"));

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

                tData = document.createElement('td');
                tData.appendChild(document.createTextNode(data[j].dateCreated));
                dataRow.appendChild(tData);

            }

        })
        .catch(err => console.log(err))
});




