const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // check for whitespace only strings
  data.full_name = !isEmpty(data.full_name) ? data.full_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // NAME
  // INCORRECT NAME LENGTH
  if (!Validator.isLength(data.full_name, { min: 2, max: 30 })) {
    errors.full_name = "Name must be between 2 and 30 characters.";
  }
  // NAME FIELD EMPTY
  if (Validator.isEmpty(data.full_name)) {
    errors.full_name = "Name field is required.";
  }

  // EMAIL
  // EMAIL FIELD EMPTY
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  // INCORRECT EMAIL FORMAT
  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email.";
  }

  // PASSWORD
  // PASSWORD FIELD EMPTY
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }
  // INCORRECT PASSWORD LENGTH
  if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
    errors.password = "Password field must be between 8 and 32 characters.";
  }
  // CONFIRM PASSWORD EMPTY
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required.";
  }
  // INCORRECT CONFIRM PASSWORD LENGTH
  if (!Validator.isLength(data.password2, { min: 8, max: 32 })) {
    errors.password2 =
      "Confirm Password field must be between 8 and 32 characters.";
  }
  // CONFIRM PASSWORD DOES NOT MATCH FIRST PASSWORD FIELD
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return { errors, isValid: isEmpty(errors) };
};
