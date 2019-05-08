const unirest = require('unirest');
const express = require('express');
require('dotenv').config();

const router = express.Router();

// @route   GET recipeAPI/recipes/complexRecipe
router.get('/complexRecipe/', (req, res) => {
  const { query, cuisine, diet, includeIngredients, excludeIngredients, intolerances } = req.query;
  unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com` +
        `/recipes/searchComplex` +
        `?query=${query}` +
        `&cuisine=${cuisine}` +
        `&diet=${diet}` +
        `&includeIngredients=${includeIngredients}` +
        `&excludeIngredients=${excludeIngredients}` +
        `&intolerances=${intolerances}` +
        `&type=main+course` +
        `&number=10` +
        `&ranking=0` +
        `&instructionsRequired=true` +
        `&addRecipeInformation=true`
      // other stuff
      // `&minCalories=150` +
      // `&maxCalories=1500` +
      // `&minFat=5` +
      // `&maxFat=100` +
      // `&minCarbs=5` +
      // `&maxCarbs=100` +
      // `&minSaturatedFat=0` +
      // `&maxSaturatedFat=50`
    )
    .header('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com')
    .header('X-RapidAPI-Key', process.env.RAPID_API_KEY)
    .end(result => {
      console.log(result.body.results);
      res.json(result.body.results);
    });
});

// @route   GET recipeAPI/recipes/recipeAutoComplete
router.get('/recipeAutoComplete/', (req, res) => {
  const { search } = req.query;
  unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com` +
        `/recipes/autocomplete` +
        `?number=5` +
        `&query=${search}`
    )
    .header('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com')
    .header('X-RapidAPI-Key', process.env.RAPID_API_KEY)
    .end(result => res.json(result.body));
});

module.exports = router;
