const unirest = require('unirest');
const express = require('express');
require('dotenv').config();

const router = express.Router();

// NEXT STEP: exclude from allergies and dietary_restrictions
// do this by adding these restrictions to the "intolerances" query below
router.get('/', (req, res) => {
  unirest
    .get(
      'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=apples%2Cflour%2Csugar'
    )
    .header('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com')
    .header('X-RapidAPI-Key', process.env.RAPID_API_KEY)
    .end(function(result) {
      console.log(result.status, result.headers, result.body);
    });
});

module.exports = router;
