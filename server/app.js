const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
require('dotenv').config();
// const recipes = require('./routes/api/recipes');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const ingredients = require('./routes/recipeAPI/ingredients');
const recipes = require('./routes/recipeAPI/recipes');

const app = express();
const nodeEnv = process.env.NODE_ENV || 'development';

// if (nodeEnv !== 'production') {
//   require('dotenv').config();
// }

const db =
  nodeEnv === 'test'
    ? process.env.TEST_MONGODB_URI
    : nodeEnv === 'development'
    ? process.env.DEV_MONGODB_URI
    : process.env.PRODUCTION_MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB(${nodeEnv}) connected...`))
  .catch(err => console.log(err));

//Attempted to see if the history object error in Survey's index.js was a CORS error but it's not
//var cors = require('cors')
//app.use(cors())

// Bodyparser Middleware
app.use(express.json());
// Passport Authentication Middleware
app.use(passport.initialize());
// Passport Configuration
require('./validation/passport')(passport);

// API to mongoDB
// app.use('/api/recipes', recipes);
app.use('/api/users', users);
app.use('/api/auth', auth);

// API to rapidAPI
app.use('/recipeAPI/ingredients', ingredients);
app.use('/recipeAPI/recipes', recipes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = { app, mongoose };
