const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

//front end
app.use('/', express.static('static'));


const parts = [
    {id: 100, name: 'Belt', colour: 'brown', stock: 0},
    {id: 101, name: 'Clip', colour: 'brown', stock: 0},
    {id: 102, name: 'Belt', colour: 'red',   stock: 0},
    {id: 103, name: 'Hat', colour: 'Purple', stock: 0},
];

app.get('/api/parts', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(parts);

});

//middleware to do logging
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

//parse data in body as JSON
router.use(express,json());



//get details for part
app.get('/api/parts/:part_id', (req, res) => {
    //part id is the get parameter not the array
    const id = req.params.part_id;
    console.log(`GET request for ${req.url}`);

    const part = parts.find(p => p.id === parseInt(id));
    if(part){
        res.send(part);
    }
    else{
        res.status(404).send(`Part ${id} was not found!`);
    }

});

router.put('/:id', (req,res) => {
    res.send('Whatever');


});

//create/replace part data for a given ID
router.put(':id', (req, res) => {
    const newpart = req.body;
    console.log("part: ", newpart);

    newpart.id = parseInt(req.params.id);
    
    const part = parts.findIndex(p => p.id === parseInt(newpart.id));
    if(part < 0){
        console.log('creating new part');

        parts.push(req.body);
    }
    else {
        console.log('Modifiying part ', req.params.id);
        parts[part] = req.body;
    }

    res.send(newpart);
    
});


router.post('/:id', (req, res) =>{
    const newpart = reqw.body;
    console.log('part: ', newpart);

    const part = parts.findIndex(p => p.id === parseInt(req.params.id));

    if(part < 0){
        res.status(404).send(`part ${req.params.id} not found`);
    }
    else {
        console.log('Changing stock for ', req.params.id);
        parts[part].stock += parseInt(req.body.stock);
        res.send(req.body);
    }


});




//can be used to skip doing /api/parts in every step (replaces app)
app.use('/api/parts', router)

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});