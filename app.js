let express = require('express');
let app = express();
let morgan = require('morgan');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.MongoLiveUrl;
let db;

app.use(morgan('common'))

app.get('/',(req,res)=>{
    res.send('Hiii From Express')
})

app.get('/location',(req,res)=>{
    db.collection('location').find().toArray((err,result) =>{
       if(err) throw err;
       res.send(result); 
    })
})

app.get('/restaurant',(req,res)=>{
    db.collection('restaurant').find().toArray((err,result) =>{
       if(err) throw err;
       res.send(result); 
    })
})

app.get('/mealType',(req,res) => {
    db.collection('mealType').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// Connection with db
MongoClient.connect(mongoUrl,(err,client)=>{
    if (err) console.log(`Error while Connecting`);
    db = client.db("aprilintern");
    app.listen(port,() => {
        console.log(`listening on port ${port}`)
    })
})
