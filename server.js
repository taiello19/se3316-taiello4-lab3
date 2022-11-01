const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

//front end
app.use('/', express.static('static'));

app.use(express.json());



app.get('/trackName', function(req, res){
    res.send('You sent this to the server:' + req.query.trackInputName);
    

});



app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});