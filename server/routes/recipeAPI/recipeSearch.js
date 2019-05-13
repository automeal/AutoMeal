const unirest = require('unirest');
const express = require('express');
require('dotenv').config();

const router = express.Router();
router.get('/', (req, res) => {
  unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C+gluten&number=10&offset=0&type=main+course&query=${
        req.query.search
      }`
    )
    .header('X-RapidAPI-Key', '15a0856626msh53a371af472b54ap1ecac4jsne501944a9542')
    .end(result => res.json(result.body));
});

module.exports = router;
