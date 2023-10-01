const express = require('express');
const jsxViewEngine = require('jsx-view-engine');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const Fruit = require('./models/Fruit');
const Veggie = require('./models/Veggie');
const fruits = require('./models/fruits.js');
const veggies = require('./models/veggies.js');
const app = express();
//Configure the app (app.set)


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//Set up view engine
app.set('view engine', 'jsx');
app.engine('jsx', jsxViewEngine());

//Define Middleware (app.use)
//middleware for function to execute all routes
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});


//view body of post request
app.use(express.urlencoded({extended:false}));

// Define routes
app.get('/', (req, res) => {
    res.send("<h1>Home page of Fruits and Veggies</h1><nav><a href='/fruits'>Main Fruits Page</a></nav>");
});



app.get('/fruits', async(req, res)=>{
  try{
    const allFruits = await Fruit.find();
      res.render('display_fruit/Index', {
          fruits: allFruits
      });
    }
    catch(error){
      console.error('error fetching fruits', error);
      res.render('ErrorPage', {error: 'Failed to fetch fruits'})
  }
});

app.get('/veggies', async(req, res)=>{
  try{
    const allVeggies = await Veggie.find();
      res.render('display_veggie/Index', {
          veggies: allVeggies
      });
    }
    catch(error){
      console.error('error fetching veggies', error);
      res.render('ErrorPage', {error: 'Failed to fetch veggies'})
  }
});

app.post('/fruits/',async (req, res)=>{
  try{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    await Fruit.create(req.body).then( (error, createdFruit)=>{
      res.redirect('/fruits');
  });

  }
  catch (error) {
    console.log('Error creating fruit', error);
    res.redirect('/fruits');//handle the error in another way
  }
});

//adding a new fruit
app.get('/fruits/new', async (req, res) => {
    res.render('display_fruit/New');
});

//test fruit data
app.get('/fruits/seed', async (req, res)=>{
await  Fruit.create([
      {
          name:'grapefruit',
          color:'pink',
          readyToEat:true
      },
      {
          name:'grape',
          color:'purple',
          readyToEat:false
      },
      {
          name:'avocado',
          color:'green',
          readyToEat:true
      }
  ]).then( (err, data)=>{
      res.redirect('/fruits');
  })
});



app.post('/veggies/',async (req, res)=>{
  try{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    await Veggie.create(req.body).then( (error, createdVeggie)=>{
      res.redirect('/veggies');
  });

  }
  catch (error) {
    console.log('Error creating veggie', error);
    res.redirect('/veggies');//handle the error in another way
  }
});

//adding a new veggie
app.get('/veggies/new', async (req, res) => {
    res.render('display_veggie/New');
});

//test veggie data
app.get('/veggies/seed', async (req, res)=>{
await  Veggie.create([
  {
    name: "spinach",
    color: "green",
    readyToEat: true,
  },
  {
    name: "onion",
    color: "yellow",
    readyToEat: true,
  },
  {
    name: "eggplant",
    color: "purple",
    readyToEat: false,
  }
]).then( (err, data)=>{
      res.redirect('/veggies');
  })
});

//new show route
app.get('/fruits/:id', async (req, res)=>{
  try{
    const foundFruit= await Fruit.findById(req.params.id);
    if(foundFruit){
      res.render('display_fruit/Show', {
          Fruit:foundFruit
      });
    }
      else{
        res.render('ErrorPage', { error: 'Fruit not found' });
            return;
      }
  }
   catch(error){
    console.log('Can not find fruit ID', error);
    res.render('ErrorPage', {error: 'Failed to fetch fruit ID'})
   }
  });

//Delete Route
//'delete' method using post
app.post('/fruits/:id', async (req, res) => {

  try {
    const deletedFruit = await fruits.findByIdAndDelete(req.params.id);
    if (!deletedFruit) {
      res.render('ErrorPage', { error: 'Fruit not found' });
      return;
    }
    res.render("fruits/Delete",{
      fruit: deletedFruit
    })
  } catch (error) {
    console.error('Error deleting fruit:', error);
    res.render('ErrorPage', { error: 'Failed to delete fruit' });
  }
});
//new show route
app.get('/veggies/:id', async (req, res)=>{
  try{
    const foundVeggie= await Veggie.findById(req.params.id);
    if(foundVeggie){
      res.render('display_veggie/Show', {
          Veggie:foundVeggie
      });
    }
      else{
        res.render('ErrorPage', { error: 'Veggie not found' });
            return;
      }
  }
   catch(error){
    console.log('Can not find veggie ID', error);
    res.render('ErrorPage', {error: 'Failed to fetch veggie ID'})
   }
  });
//'delete' method using post
app.post('/veggies/:id', async (req, res) => {

  await Veggie.findByIdAndDelete(req.params.id).then(() => {
      console.log("deleted");//error checking
      res.redirect('/veggies');
  }).catch(function (err) {
      console.log(err);
      res.render('/veggies', { error: err })
  });

});




app.listen(3000, function () {
  console.log('Server started on port 3000');
});