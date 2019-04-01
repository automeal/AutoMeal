const express = require("express");
const router = express.Router();

// User Model
const User = require("../../models/User");

// @route   DELETE api/deleteUser/
// @desc    delete user
// @access  Private
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
