const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // check for whitespace only strings
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // EMAIL
  // INCORRECT EMAIL FORMAT
  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email.";
  }
  // EMAIL FIELD EMPTY
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  // PASSWORD
  // INCORRECT PASSWORD LENGTH
  if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
    errors.password = "Password field must be between 8 and 32 characters.";
  }
  // PASSWORD FIELD EMPTY
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }

  return { errors, isValid: isEmpty(errors) };
};
