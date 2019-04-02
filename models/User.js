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
  register_date: {
    type: Date,
    default: Date.now
  },

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

module.exports = User = mongoose.model("user", UserSchema);
