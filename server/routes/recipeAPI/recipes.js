const unirest = require('unirest');
const express = require('express');
require('dotenv').config();

const router = express.Router();

// NEXT STEP: exclude from allergies and dietary_restrictions
// do this by adding these restrictions to the "intolerances" query below
router.get('/', (req, res) => {
  // const includeIngredients = ['tomato', 'onions'];
  // const excludeIngredients = ['kale', 'cinnamon'];
  // const intolerances = ['eggs', 'nuts'];
  const { query, includeIngredients, excludeIngredients, intolerances } = req.query;
  unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com` +
        `/recipes/searchComplex` +
        `?query=${query}` +
        `&includeIngredients=${includeIngredients.join('%2C+')}` +
        `&excludeIngredients=${excludeIngredients.join('%2C+')}` +
        `&intolerances=${intolerances.join('%2C+')}` +
        `&ignorePantry=false` +
        `&type=main+course` +
        `&number=5` +
        `&ranking=1` +
        // other stuff
        `&minCalories=150` +
        `&maxCalories=1500` +
        `&minFat=5` +
        `&maxFat=100` +
        `&minProtein=5` +
        `&maxProtein=100` +
        `&minCarbs=5` +
        `&minAlcohol=0` +
        `&maxAlcohol=1000` +
        `&minCaffeine=0` +
        `&maxCaffeine=1000` +
        `&minCalcium=0` +
        `&maxCalcium=1000` +
        `&minCholesterol=0` +
        `&maxCholesterol=1000` +
        `&minSaturatedFat=0` +
        `&maxSaturatedFat=50` +
        `&minVitaminA=0` +
        `&maxVitaminA=5000` +
        `&minVitaminC=0` +
        `&maxVitaminC=1000` +
        `&minVitaminD=0` +
        `&maxVitaminD=1000` +
        `&minVitaminE=0` +
        `&maxVitaminE=1000` +
        `&minFiber=0` +
        `&maxFiber=1000` +
        `&minIron=0` +
        `&maxIron=1000` +
        `&minPotassium=0` +
        `&maxPotassium=1000` +
        `&minSodium=0` +
        `&maxSodium=1000` +
        `&minSugar=0` +
        `&maxSugar=1000`
    )
    .header('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com')
    .header('X-RapidAPI-Key', process.env.RAPID_API_KEY)
    .end(result => {
      console.log(result.body);
      res.json(result.body);
    });
});

module.exports = router;
