const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateUpdatedInput(data) {
  let errors = {};

  if (data.full_name) {
    // NAME
    // check for whitespace only strings
    data.full_name = !isEmpty(data.full_name) ? data.full_name : '';
    // INCORRECT NAME LENGTH
    if (!Validator.isLength(data.full_name, { min: 2, max: 30 })) {
      errors.full_name = 'Name must be between 2 and 30 characters.';
    }
    // NAME FIELD EMPTY
    if (Validator.isEmpty(data.full_name)) {
      errors.full_name = 'Name field is required.';
    }
  }

  if (data.email) {
    // EMAIL
    data.email = !isEmpty(data.email) ? data.email : '';
    // EMAIL FIELD EMPTY
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required.';
    }
    // INCORRECT EMAIL FORMAT
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email.';
    }
  }

  if (data.password) {
    // PASSWORD
    data.password = !isEmpty(data.password) ? data.password : '';
    // PASSWORD FIELD EMPTY
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Password field is required.';
    }
    // INCORRECT PASSWORD LENGTH
    if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
      errors.password = 'Password field must be between 8 and 32 characters.';
    }
  }

  return { errors, isValid: isEmpty(errors) };
};
