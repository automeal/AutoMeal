const unirest = require('unirest');
const express = require('express');
require('dotenv').config();

const router = express.Router();

// NEXT STEP: exclude from allergies and dietary_restrictions
// do this by adding these restrictions to the "intolerances" query below

// @route   GET recipeAPI/ingredients/?search=
router.get('/', (req, res) => {
  unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/` +
        `food/ingredients/autocomplete` +
        `?number=5` +
        `&intolerances=` +
        `&query=${req.query.search}`
    )
    .header('X-RapidAPI-Key', process.env.RAPID_API_KEY)
    .end(result => res.json(result.body));
});

module.exports = router;
