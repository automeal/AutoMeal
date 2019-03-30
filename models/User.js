const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
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
  dietary_restrictions: {
    type: Array,
    default: ["salt", "oil", "lettuce", "pepper", "goya", "milk", "ice cream"]
  }
});

module.exports = User = mongoose.model("user", UserSchema);
