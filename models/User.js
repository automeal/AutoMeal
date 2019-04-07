const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  // Credentials/Authorization/Metadata
  full_name: {
    type: String,
    required: true
  },
  display_name: {
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
  registration_date: {
    type: Date,
    default: Date.now
  },
  // last_updated: {
  //   type: Date,
  //   default: Date.now
  // },
  // last_full_name_update: {
  //   type: Date,
  //   default: Date.now
  // },
  // last_password_update: {
  //   type: Date,
  //   default: Date.now
  // },

  // AutoMeal watching your every move
  // Data users provide and we store create a more personal experience
  pantry: {
    type: Array,
    default: ["salt", "oil", "lettuce", "pepper", "goya", "milk", "ice cream"]
  },
  dietary_restrictions: {
    type: Array,
    default: []
  },
  allergies: {
    type: Array,
    default: []
  }
});

module.exports = User = mongoose.model("users", UserSchema);

// Additional fields
// dietary pref (vegan/kosher)
// weekly meal plan
// previous meal plans
// maybe just one array and we retrieve last/first meal plan as current
// fave recipes
// recently searched items (recipes/ingredients/)
