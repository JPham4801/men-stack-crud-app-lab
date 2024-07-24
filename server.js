const dotenv = require('dotenv');
dotenv.config(); // loads enviroment variables from .env file
const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require('method-override')
const morgan = require('morgan')

const app = express();

// Connect to MongoDB using the connection string in .env file
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Import Cat Schema
const Cat = require('./models/cat.js');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

app.get('/', (req, res, next) =>{
  res.render('index.ejs');
})

app.get('/cats', async (req, res, next) =>{
  const allCats = await Cat.find()
  res.render('cats/index.ejs', { cats: allCats});
})

app.get('/cats/new', (req, res, next) =>{
  res.render('cats/new.ejs');
}) 

app.get('/cats/:catId', async (req, res, next) =>{
  const foundCat = await Cat.findById(req.params.catId);
  res.render('cats/show.ejs', { cat: foundCat });
})

app.get('/cats/:catId/edit', async (req, res, next) =>{
  const foundCat = await Cat.findById(req.params.catId);
  res.render('cats/edit.ejs', { cat: foundCat });
})

app.post('/cats', async (req, res, next) =>{
  if (req.body.isHungry){
    req.body.isHungry = true
  } else {
    req.body.isHungry = false
  }

  await Cat.create(req.body);
  res.redirect('/cats');
})

app.delete('/cats/:catId', async (req, res, next) =>{
  await Cat.findByIdAndDelete(req.params.catId);
  res.redirect('/cats');
})

app.put('/cats/:catId', async (req, res, next) =>{
  if (req.body.isHungry) {
    req.body.isHungry = true;
  } else {
    req.body.isHungry = false;
  }

  await Cat.findByIdAndUpdate(req.params.catId, req.body);
  res.redirect(`/cats/${req.params.catId}`);
})