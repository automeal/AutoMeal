const unirest = require("unirest");
const express = require("express");
const router = express.Router();
const config = require("config");
const rapidAPIKey = config.get("rapidAPIKey");

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