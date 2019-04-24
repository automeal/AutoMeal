const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // check for whitespace only strings
  data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : '';

  // NAME
  // INCORRECT NAME LENGTH
  if (!Validator.isLength(data.fullName, { min: 2, max: 30 })) {
    errors.fullName = 'Name must be between 2 and 30 characters.';
  }
  // NAME FIELD EMPTY
  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = 'Name field is required.';
  }

  // EMAIL
  // EMAIL FIELD EMPTY
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required.';
  }
  // INCORRECT EMAIL FORMAT
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email.';
  }

  // PASSWORD
  // INCORRECT PASSWORD LENGTH
  if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
    errors.password = 'Password field must be between 8 and 32 characters.';
  }
  // PASSWORD FIELD EMPTY
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.';
  }
  // INCORRECT CONFIRM PASSWORD LENGTH
  if (!Validator.isLength(data.confirm_password, { min: 8, max: 32 })) {
    errors.confirm_password = 'Confirm Password field must be between 8 and 32 characters.';
  }
  // CONFIRM PASSWORD DOES NOT MATCH FIRST PASSWORD FIELD
  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = 'Passwords must match';
  }
  // CONFIRM PASSWORD EMPTY
  if (Validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = 'Confirm Password field is required.';
  }

  return { errors, isValid: isEmpty(errors) };
};
