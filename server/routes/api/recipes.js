const unirest = require('unirest');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
  // console.log(req.query.search);
  // unirest
  //   .get(
  //     // insert the following as get URI params for user requests/lookups(?):
  //     // req.params.number
  //     // req.params.tags
  //     // exclude foods user does not eat
  //     "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=vegetarian%2Cdessert"
  //   )
  //   .header("X-RapidAPI-Key", process.env.RAPID_API_KEY)
  //   .end(result => res.json(result.body));
  // unirest
  //   .get(
  //     `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=5&intolerances=egg&query=${
  //       req.query.search
  //     }`
  //   )
  //   .header("X-RapidAPI-Key", process.env.RAPID_API_KEY)
  //   .end(result => res.json(result.body));
});

module.exports = router;
