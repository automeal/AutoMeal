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
/*
 NOTE: About what and how to patch our data
 - PANTRY is always (should be) only updated one item at a time via the DASHBOARD
 - DIETARY RESTRICTIONS and ALLERGIES are replaced by SURVEY
 and then (should) only one at a time via DASHBOARD
 - MEAL PLANS must be appended to, on patches (for meal plan history), but may be replaced for whatever 
reason if passed as an array
 - PASSWORD must be checked against current
 Check for these and patch accordingly.
 This call needs clean up and validation

 Some functionality would be better served as a different api call, but for now, can use patch to replace any fields 
 in the DB for a user, or append to array fields in the DB when given one value for those fields.

 ie. Suppose I want to remove a dietary restriction, this single patch would append that data instead of remove,
 no way of differentiating if it's something that should be removed instead
*/
router.patch('/:id', (req, res) => {
  //console.log('backend patch user endpoint');
  //console.log(req.body);

  const { errors, isValid } = validateUpdateInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // If the user wishes to update their password we must hash it first
  if (req.body.password) {
    console.log('Password patching');
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
  } else {
    /*
    For any of the following keys in our data (req.body), append the values of those keys to our database 
    instead of overwriting the field (default patch behaviour)
    ie.
      if 
        req.body['allergies'] = 'walnuts'  
        
        Append 'walnuts' to Database (allergies array)

      if 
        req.body['allergies'] = ['walnuts','peanuts','cashews']

        Overwrite Database (allergies array)

    This would probably be better served as a different api call imo,
    implemented as

      router.patch('/append/:id'), (req, res) => { .... }

    and the used in the client as 

      axios.patch(`/api/users/append/${this.state.currUser.id}` ....

    So that if you want to explicitly append data to a field you call that, the disadvantage is that some actions may require more 
    than one api call.

    */

    //Summary
    //If the prop (key) in our data (req.body) is an array type in our DB (userDBFields, a custom export from User.js),
    //then append the data (value of key in req.body) to the DB instead of overwriting it if it's just a single value (not array)

    //var toCheck = ['pantry', 'mealplans', 'allergies', 'dietaryrestrictions'];
    var db_commands = {};
    var data = req.body;
    for (var prop in data) {
      if (User.arrayDBFields.includes(prop.toLowerCase()) && data[prop].constructor !== Array) {
        var temp = data[prop];
        delete data[prop];

        if (!('$push' in db_commands)) db_commands['$push'] = {};

        db_commands['$push'][prop] = temp;
        /*
        User.updateOne({ _id: req.params.id }, { '$push': { [prop]: toSave } }, (err, raw) => {   
           if (err) {
              console.log(err);
           } else {
            console.log('Append value:', toSave,' to Property :',prop,'in Database.');
           }
         });
       */
      }
    }

    //Only overwrite data if something is there, will throw if there's nothing for operator $set to use in the DB anyway
    if (Object.keys(data).length > 0) db_commands['$set'] = data;

    /*
    Additional Notes:

    It's possible to use async so that await keyword can be used to make the flow easier, but since it already works,
    and also consolidated it to one database call, no reason other than readaibility to change this function to async now. 

    Won't fix errors with the history object in React anyway, have tried immediately returning res.send("any string");
    to see if it was calls to DB causing errors when using the history object after an axios call, but no difference so
    it's not this call or any part of this function that seems to be the cause of communication errors between React
    and Express when using React's history object after an axios (or any http lib for that matter it seems) call is finished
    via callbacks.

    */
    User.updateOne({ _id: req.params.id }, db_commands, (err, raw) => {
      if (err) {
        console.log('ERR:', err);
        return res.send(err);
      } else {
        console.log('DB patch successful');
        //console.log('RAW', raw);
        return res.send(raw);
      }
    });
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
