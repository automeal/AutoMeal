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
  const { full_name, email, password } = req.body;
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
          jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                full_name: user.full_name,
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
        const payload = { id: user.id, full_name: user.full_name, password: user.password };
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

// @route   PATCH api/users/:id/changePassword
// @desc    change passwords
// @access  Private
router.patch('/:id/changePassword', (req, res) => {
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
    res.send({ error: 'No password to patch' });
  }
});

//Basically this patch call either replaces or appends to fields in the DB
/*
 NOTE: About what and how to patch our data
 - PANTRY is always (should be) only updated one item at a time via the DASHBOARD
 - DIETARY RESTRICTIONS and ALLERGIES are replaced by SURVEY
 and then (should) only one at a time via DASHBOARD
 - MEAL PLANS must be appended to, on patches (for meal plan history), but may be replaced for whatever 
reason if passed as an array
 - Use PATCH api/users/:id/changePassword route to change passwords
*/
// @route   PATCH api/users/
// @desc    update user
// @access  Private
router.patch('/:id', (req, res) => {
  console.log('Patch /:id route');

  const { errors, isValid } = validateUpdateInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (req.body.password) {
    var msg = 'Do not use PATCH api/users/:id for changing passwords';
    console.log(msg);
    return res.send({ error: msg });
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

    var db_commands = {};
    var data = req.body;
    for (var prop in data) {
      if (User.arrayDBFields.includes(prop) && data[prop].constructor !== Array) {
        var temp = data[prop];
        delete data[prop];

        if (!('$push' in db_commands)) db_commands['$push'] = {};

        db_commands['$push'][prop] = temp;
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

// Note: Can not use "DELETE" HTTP header for this even if it seems intuitive because
// DELETE requests do not carry data, has to be POST or PATCH to pass req.body
// @route   POST api/users/deleteFromArray
// @desc    Enter in name of DB field as a key, and the values what to delete from the DB field. Only for DB fields that are arrays.
// @access  Private
router.post('/:id/deleteFromArray', (req, res) => {
  var db_commands = {
    $pull: {},
    $pullAll: {}
  };
  var data = req.body;

  for (var prop in data) {
    if (User.arrayDBFields.includes(prop)) {
      var temp = data[prop];

      if (data[prop].constructor !== Array) {
        db_commands['$pull'][prop] = temp;
      } else {
        db_commands['$pullAll'][prop] = temp;
      }
    }
  }

  for (key in db_commands) {
    if (Object.keys(db_commands[key]).length < 1) {
      delete db_commands[key];
    }
  }

  console.log('Delete From array commands', db_commands);

  User.updateOne({ _id: req.params.id }, db_commands, (err, raw) => {
    if (err) {
      return res.send(err);
    } else {
      console.log('DB (deletef from array) successful');
      return res.send(raw);
    }
  });
});

// May or may not be needed, probably not
// @route   POST api/users/deleteEntireField
// @desc    To delete everything in a field in the DB, enter in the name such as example.data.array as a string in an array,
// or a key in an object (any value). Some fields won't be deleted.
// @access  Private
router.post('/:id/deleteEntireField', (req, res) => {
  var db_commands = { $unset: {} };
  var data = req.body;

  if (data.constructor === Array) {
    for (var i = 0; i < data.length; i++) {
      db_commands['$unset'][data[i]] = 1;
    }
  } else {
    for (var element in data) {
      data[element] = 1;
    }
    db_commands['$unset'] = data;
  }

  var dontDelete = [
    'mealplans',
    'pantry',
    'fullname',
    'email',
    'password',
    'username',
    'registrationdate'
  ];

  if (data.constructor === Array) {
    for (var i = 0; i < data.length; i++) {
      if (dontDelete.includes(data[i].toLowerCase())) {
        console.log({ error: 'Field ' + data[i] + ' is not an allowable field to delete' });
        return res.send({ error: 'Field ' + data[i] + ' is not an allowable field to delete' });
      }
    }
  } else {
    for (var prop in data) {
      if (dontDelete.includes(prop.toLowerCase())) {
        console.log({ error: 'Field ' + prop + ' is not an allowable field to delete' });
        return res.send({ error: 'Field ' + prop + ' is not an allowable field to delete' });
      }
    }
  }

  console.log('Delete field(s)', db_commands);

  User.updateOne({ _id: req.params.id }, db_commands, (err, raw) => {
    if (err) {
      return res.send(err);
    } else {
      res.send(raw);
      return raw;
    }
  });
});

// @route   DELETE api/users/
// @desc    delete user, not reccomended to use
// @access  Private
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   GET api/users/current
// @desc    Return current user (everything, can be more efficient/specific TODO)
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) =>
  res.json({
    id: req.user.id,
    full_name: req.user.full_name,
    email: req.user.email,
    pantry: req.user.pantry,
    dietary_restrictions: req.user.dietary_restrictions,
    allergies: req.user.allergies,
    mealPlans: req.user.mealPlans,
    calories: req.user.calories,
    mealCount: req.user.mealCount,
    planType: req.user.planType
  })
);

module.exports = router;
