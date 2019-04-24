const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealSchema = new Schema({
  planType: Number,
  calories: Object,
  personCount: Number,
  mealCount: Number,
  recipes: Array
});

// Create Schema
const UserSchema = new Schema({
  // Credentials/Authorization/Metadata
  fullName: {
    type: String,
    required: true
  },
  displayName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  // last_password_update: {
  //   type: Date,
  //   default: Date.now
  // },

  // AutoMeal watching your every move
  // Data users provide and we store create a more personal experience
  pantry: {
    type: Array,
    default: ['salt', 'pepper', 'oil', 'lettuce', 'milk', 'ice cream']
    // have this be an object with the array and creation date so that we may refresh weekly
  },
  dietaryRestrictions: {
    type: Array,
    default: []
  },
  allergies: {
    type: Array,
    default: []
  },
  mealPlans: [MealSchema]
});

module.exports = User = mongoose.model('users', UserSchema);

// Additional fields
// dietary pref (vegan/kosher)
// weekly meal plan
// previous meal plans
// maybe just one array and we retrieve last/first meal plan as current
// fave recipes
// recently searched items (recipes/ingredients/)
