var express = require('express');
var app = express();
var mongoose = require('mongoose');
const Sport = require('./models/Sport.js');
const Court = require('./models/Court.js');

var port = 3000;
var dbURL = 'mongodb://localhost:27017/bookingapp';

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('www'));

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.post('/addSport', (req,res) => {
    //const lat = req.body.lat;
    const { name } = req.body;
    var sport = new Sport({
       
        name,
    
    }) 
    sport.save();
    console.log('Sport Added');
    
});

app.get('/getSport', (req, res)=>{
    Sport.find({}, (err, docs) =>{
        if (err) throw err;
        res.send(docs);
    })
})


app.post('/addCourt', (req,res) => {
    //const lat = req.body.lat;
    
    const { name, address, lat, lng, w3w, sportId  } = req.body;
    var sport = mongoose.Types.ObjectId(sportId);
    var court = new Court({
       
        name,
        address, 
        lat,
        lng,
        w3w,
        sport

    
    }) 
    court.save();
    console.log('Court Added')
   
});


mongoose.connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log('connected to DB');
}).catch((err)=>{
    console.log(err.message);
});

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`)
} );