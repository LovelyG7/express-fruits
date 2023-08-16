const express = require('express');
const jsxViewEngine = require('jsx-view-engine');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const fruits = require('./models/fruits.js');
const vegatables = require('./models/veggies.js');

const app = express();
//Configure the app (app.set)

app.set('view engine', 'jsx');
// Set up view engine
app.engine('jsx', jsxViewEngine());


//Define Middleware (app.use)
//middleware for function to execute all routes
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

// Define routes
app.get('/', (req, res) => {
    res.send("Home page of Fruits and Veggies");
});
app.get('/fruits/', (req, res) => {
    // res.send(fruits)
    res.render('Index', {fruits: fruits});
});

//put this above your Show route
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits')
});

// Create a SHOW route (show routes use a get request)
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    res.render('Show', {
        // include a second param that must be an object (req.params.indexOfFruitsArray)
        fruit: fruits[req.params.indexOfFruitsArray]
    });
});

app.get('/veggies/', (req, res) => {
    res.send(vegatables)
});
app.get('/veggies/:indexOfVegetablesArray', (req, res) => {
    res.send(vegatables[req.params.indexOfVegetablesArray]);
});





app.listen(3000, () => {
    console.log('Listening on port 3000');
});