const express = require('express');
const app = express();
const port = 3000;

const MongoClient = require('mongodb').MongoClient

let db;
let collection;
const bodyParser = require('body-parser');


MongoClient.connect('mongodb://localhost/crud-express', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('crud-express')
    collection= db.collection('product')
})

app.listen(3000, function () {
    console.log('listening on '+port)
});
app.use(bodyParser.json());


//CRUD students
//Read all
app.get('/students', (req, res) => {
    db.collection('students').find().toArray()
        .then(results =>{
            res.json(results);
        }).catch(error => console.error(error));
})

//Read by DNI
app.get('/students/:dni', (req, res) => {
    db.collection('students').find({dni: req.params.dni }).toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

//Create
app.post('/students', (req, res) => {
    db.collection('students').insertOne(req.body)
        .then(result => {
            res.json('Success');
        })
        .catch(error => console.error(error))
})


//Update
app.put('/students/:dni', (req, res) => {
    db.collection('students').findOneAndUpdate(
        { dni: req.params.dni },
        {
            $set: {
                name: req.body.name,
                dni: req.body.dni,
                class: req.body.class
            }
        },
        {
            upsert: true
        }
    ).then(result => { res.json('Updated') })
        .catch(error => console.error(error))
});

//Delete
app.delete('/student/:dni', (req, res) => {
    db.collection('students').deleteOne(
        { dni: req.params.dni }
    )
        .then(result => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})


//Courses

//Read all
app.get('/courses', (req, res) => {
    db.collection('courses').find().toArray()
        .then(results =>{
            res.json(results);
        }).catch(error => console.error(error));
})

//Read by code
app.get('/courses/:code', (req, res) => {
    db.collection('courses').find({code: req.params.code }).toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

//Create
app.post('/courses', (req, res) => {
    db.collection('courses').insertOne(req.body)
        .then(result => {
            res.json('Success');
        })
        .catch(error => console.error(error))
})


//Update
app.put('/courses/:code', (req, res) => {
    db.collection('courses').findOneAndUpdate(
        { code: req.params.code },
        {
            $set: {
                name: req.body.name,
                dni: req.body.dni,
                class: req.body.class
            }
        },
        {
            upsert: true
        }
    ).then(result => { res.json('Updated') })
        .catch(error => console.error(error))
});

//Delete
app.delete('/courses/:code', (req, res) => {
    db.collection('courses').deleteOne(
        { code: req.params.code }
    )
        .then(result => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})






app.get('/product', (req, res) => {
    db.collection('product').find().toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})
app.get('/product/:name', (req, res) => {
    db.collection('product').find({"name": req.params.name }).toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

app.post('/product', (req, res) => {
    collection.insertOne(req.body)
        .then(result => {
            res.json('Success');
        })
        .catch(error => console.error(error))
})

app.put('/product/:id', (req, res) => {
    collection.findOneAndUpdate(
        { name: req.params.id },
        {
            $set: {
                name: req.body.name,
                price: req.body.price
            }
        },
        {
            upsert: true
        }
    ).then(result => { res.json('Updated') })
        .catch(error => console.error(error))
});

app.delete('/product/:id', (req, res) => {
    collection.deleteOne(
        { name: req.params.id }
    )
        .then(result => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})