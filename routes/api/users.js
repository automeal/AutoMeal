const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  // console.log("in post");
  const { full_name, email, password } = req.body;

  // Simple validation
  if (!full_name || !email || !password) {
    // console.log(
    //   "name: " + full_name + ", email:" + email + ", password:" + password
    // );
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      full_name,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              console.log("token:" + token);
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  full_name: user.full_name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

// @route   PUT api/users/
// @desc    update user
// @access  Private
router.patch("/:id", (req, res) => {
  // User.findById(req.params.id)
  //   .then(
  //     user =>
  //       // user.updateOne(
  //       //   { _id: user._id },
  //       //   { $set: { dietary_restrictions: req.body } }
  //       // )
  //       (user.dietary_restrictions = req.body.dietary_restrictions)
  //   )
  //   .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/users/
// @desc    delete user
// @access  Private
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
