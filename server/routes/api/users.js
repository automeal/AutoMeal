const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const router = express.Router();

// Validators
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUpdateInput = require('../../validation/update');

// User Model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
  const { fullName, email, password } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = `Email ${email} already exists`;
      return res.status(400).json({ email: 'Invalid ' });
    }

    const newUser = new User({
      fullName,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email
              }
            });
          });
        });
      });
    });
  });
});

// @route   POST api/users/login
// @desc    Login as user and return JWT
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    // look up email
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // if found check password
    bcrypt.compare(password, user.password).then(isMatch => {
      // if passwords match
      if (isMatch) {
        // copy user info
        const payload = { id: user.id, fullName: user.fullName, password: user.password };
        // sign the data with secret and set TTL
        // return user token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: `Bearer ${token}` });
        });
      } else {
        // if passwords DO NOT match
        errors.password = 'Incorrect password';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   PATCH api/users/
// @desc    update user
// @access  Private
router.patch('/:id', (req, res) => {
  console.log('backend patch user endpoint');
  console.log(req.body);
  const { errors, isValid } = validateUpdateInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // If the user wishes to update their password we must hash it first
  if (req.body.password) {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          errors.email = 'User not found';
          return res.status(404).json(errors);
        }

        // if found check password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          console.log('gave new password');
          // if passwords match don't bother
          if (isMatch) {
            errors.password = 'Password cannot be the same as previous password.';
            console.log('gave old password');
            return res.status(400).json(errors);
          } else {
            // if new password given,
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                // Change password field in request to hashed version
                req.body.password = hash;
                // must do this step in arrow function (req.body.password is reset after)
                User.updateOne({ _id: req.params.id }, req.body, (err, raw) => {
                  err ? res.send(err) : res.send(raw);
                });
              });
            });
          }
        });
      })
      .catch(err => console.log(err));
  }
  // If no password pushed push other data
  else {
    console.log('other1');

    var toCheck = ['pantry', 'mealplans', 'allergies'];

    for (var prop in req.body) {
      console.log('Property', prop);
      if (toCheck.includes(prop)) {
        var toSave = req.body[prop];
        console.log('Propery Value', toSave);
        delete req.body[prop];

        User.updateOne({ _id: req.params.id }, { $push: { [prop]: toSave } }, (err, raw) => {
          console.log('Append to', prop);
          if (err) {
            console.log(err);
            //res.send(err);
          } else {
            //res.send(raw);
          }
        });
      }
    }

    /*
    if (req.body.pantry && req.body.pantry.constructor !== Array){
      var pantry = req.body.pantry;
      delete req.body.pantry;
      console.log("Are we good??", pantry);

      User.updateOne({ _id: req.params.id }, { $push : {'pantry': pantry} }, (err, raw) => {
        console.log('Append pantry');
        if (err) {
          console.log(err);
          //res.send(err);
        } else {
          //res.send(raw);
        }
      });      
    }

    if (req.body.mealPlans && req.body.mealPlans.constructor !== Array){
      var mealPlans = req.body.mealPlans;
      delete req.body.mealPlans;
      User.updateOne({ _id: req.params.id }, { $push : {'mealPlans':mealPlans} }, (err, raw) => {
        console.log('Append Mealplans');
        if (err) {
          console.log(err);
          //res.send(err);
        } else {
          //res.send(raw);
        }
      });      
    }
    */

    if (req.body) {
      console.log('TO DB:', req.body);
      User.updateOne({ _id: req.params.id }, req.body, (err, raw) => {
        console.log('tries to update');
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(raw);
        }
      });
    }
  }
});

// @route   DELETE api/users/
// @desc    delete user
// @access  Private
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) =>
  res.json({
    id: req.user.id,
    fullName: req.user.fullName,
    email: req.user.email,
    pantry: req.user.pantry,
    dietaryRestrictions: req.user.dietaryRestrictions,
    allergies: req.user.allergies
  })
);

module.exports = router;
