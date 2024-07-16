const dotenv = require('dotenv'); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require('express');
const mongoose = require('mongoose'); // require package
const Food = require('./models/food.js');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const app = express();

// middleware
app.use(express.urlencoded({ extended: false })); // after const app = express(); and before everything else
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.render('index.ejs');
});

app.get('/foods/new', (req, res, next) =>{
  res.render('foods/new.ejs')
})

// app.get('/foods', async (req, res, next) =>{
//   if(req.body.isReadyToAdopt === 'on'){
//     req.body.isReadyToAdopt = true;
//   } else {
//     req.body.isReadyToAdopt = false;
//   }
//   await food.create(req.body)
//   red.redirect('/foods')
// })

app.get('/foods', async (req, res, next) => {
  const allFoods = await Food.find();
  res.render('foods/index.ejs', {
    foods: allFoods,
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
