const unirest = require("unirest");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const rapidAPIKey = process.env.RAPID_API_KEY;

router.get("/", (req, res) => {
  unirest
    .get(
      // insert the following as get URI params for user requests/lookups(?):
      // req.params.number
      // req.params.tags
      // exclude foods user does not eat
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=vegetarian%2Cdessert"
    )
    .header("X-RapidAPI-Key", rapidAPIKey)
    .end(result => res.json(result.body));
});

module.exports = router;
