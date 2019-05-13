const unirest = require('unirest');
const express = require('express');
require('dotenv').config();

const router = express.Router();
const User = require('../../models/User');
const Recipes = require('../../models/User').Recipes;
const Users = require('../../models/User');

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function sendSpoonacularRequest(params_string) {
  var result = await unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com` +
        `/recipes/searchComplex` +
        params_string
    )
    .header('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com')
    .header('X-RapidAPI-Key', process.env.RAPID_API_KEY);

  var data = result.body.results;
  for (var a in data) {
    var recipe = data[a];
    var ingredients = [];
    var missed_ingredients = [];
    var used_ingredients = [];
    var unused_ingredients = [];
    var all_ingredients = [];

    for (var b in recipe.analyzedInstructions[0].steps) {
      var step = recipe.analyzedInstructions[0].steps[b];

      for (var c in step.ingredients) {
        var ingredient = step.ingredients[c].name;
        if (ingredients.indexOf(ingredient) === -1) {
          ingredients.push(ingredient);
          all_ingredients.push(ingredient);
        }
      }
    }

    for (var d in recipe.usedIngredients) {
      var ingredient = recipe.usedIngredients[d].name;
      if (used_ingredients.indexOf(ingredient) === -1) {
        used_ingredients.push(ingredient);
        all_ingredients.push(ingredient);
      }
    }

    for (var e in recipe.unusedIngredients) {
      var ingredient = recipe.unusedIngredients[e].name;
      if (unused_ingredients.indexOf(ingredient) === -1) {
        unused_ingredients.push(ingredient);
        all_ingredients.push(ingredient);
      }
    }

    for (var f in recipe.missedIngredients) {
      var ingredient = recipe.missedIngredients[f].name;
      if (missed_ingredients.indexOf(ingredient) === -1) {
        missed_ingredients.push(ingredient);
        all_ingredients.push(ingredient);
      }
    }

    //console.log(ingredients);
    //console.log(missed_ingredients);
    //console.log(unused_ingredients);
    //console.log(used_ingredients);

    data[a]['INGREDIENTS'] = ingredients;
    data[a]['MISSEDINGREDIENTS'] = missed_ingredients;
    data[a]['UNUSEDINGREDIENTS'] = unused_ingredients;
    data[a]['USEDINGREDIENTS'] = used_ingredients;
    data[a]['ALLINGREDIENTS'] = all_ingredients;
    //break;

    break;
  }
  return data;
}

async function updateMealPlan(data, _id, mealPlans, alreadyUsedRecipes) {
  for (var a in data) {
    var recipe = data[a];
    var err,
      doc = await Recipes.findOneAndUpdate({ id: recipe.id }, recipe, { upsert: true, new: true });
    if (err) {
      console.log(err);
      throw new Error('Bad Update? The heck');
      return err, doc;
      //return res.status(500).send( { error: err });
    }
  }

  var recipe = null;
  //Choose random recipe, TO DO: Make sure recipes dont overlap, pick the best ones, etc
  while (data.length > 0) {
    var rand = Math.floor(Math.random() * data.length);
    recipe = data[rand];

    if (alreadyUsedRecipes['arr'].includes(recipe.id)) {
      delete data[rand];
      continue;
    }

    break;
  }
  alreadyUsedRecipes.arr.push(recipe.id);
  console.log('alreadyused', alreadyUsedRecipes);
  //console.log("mealPlans", mealPlans);
  console.log(
    'Just dump recipes in array for now, meant to store only ids to save on storage space'
  );
  mealPlans[mealPlans.length - 1]['recipes'].push(recipe);

  console.log('Recipe ID (from Spoonacular:', recipe.id);

  return mealPlans;
}
// @route   POST recipeAPI/recipes/generateMealPlan
router.post('/generateMealPlan/', async (req, res) => {
  //const { query, cuisine, diet, includeIngredients, excludeIngredients, intolerances } = req.query;

  const { mealCount, _id, planType, calories } = req.body;

  var mealPlanCount = mealCount - 1; //breakfast generation, also use mutable version careful
  var mealPlans = (await Users.findOne({ _id: _id }, { mealPlans: 1 }))['mealPlans'];

  mealPlans.push({
    recipes: [],
    created_on: Date.now,
    planType: planType,
    calories: calories,
    mealCount: mealCount,
    status: 'Currently generating meal plan'
  });
  //return null;

  var params_string = '';
  for (var param in req.query) {
    if (req.query[param] && req.query[param].constructor === Array) {
      //if ( req.query[param].length > 0)
      params_string += '&' + param + '=' + req.query[param].join('%2C');
    } else if (req.query[param]) {
      params_string += '&' + param + '=' + req.query[param];
    }
  }
  params_string = '?' + params_string.slice(1, params_string.length);
  params_string +=
    '&number=10&limitLicense=false&offset=0&ranking=0&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true';

  console.log('Param String (Server)', params_string);

  var breakfast_string = params_string + '&type=breakfast';
  var alreadyUsedRecipes = { arr: [] }; //javascript stuff, can't pass by reference without doing this
  var data = await sendSpoonacularRequest(breakfast_string);
  mealPlans = await updateMealPlan(data, _id, mealPlans, alreadyUsedRecipes);
  await sleep(200); //Don't hammer the recipe API

  for (var i = 0; i < mealPlanCount; i++) {
    console.log('MEAL PLAN COUNT LEFT', mealPlanCount - i);
    //Alternate between main meal and anything else (breakfast unforatunately included)
    if (i % 2 == 0) {
      var data = await sendSpoonacularRequest(params_string);
      mealPlans = await updateMealPlan(data, _id, mealPlans, alreadyUsedRecipes);
      await sleep(200);
    } else {
      var main_course_string = params_string + '&type=main course';
      var data = await sendSpoonacularRequest(main_course_string);
      mealPlans = await updateMealPlan(data, _id, mealPlans, alreadyUsedRecipes);
      await sleep(200);
    }
  }

  mealPlans[mealPlans.length - 1]['status'] = 'Finished generating';
  //If all is well, update the mealPlans array with the latest mealplan
  await Users.update({ _id: _id }, { mealPlans: mealPlans });
  //console.log(user);
  console.log('meal plan finished generating server side!');
  res.send({ message: 'meal plan generation success', mealPlans: mealPlans });
});

// @route   GET recipeAPI/recipes/complexRecipe
router.get('/complexRecipe/', async (req, res) => {
  const { query, cuisine, diet, includeIngredients, excludeIngredients, intolerances } = req.query;

  var params_string = '';
  for (var param in req.query) {
    if (req.query[param] && req.query[param].constructor === Array) {
      //if ( req.query[param].length > 0)
      params_string += '&' + param + '=' + req.query[param].join('%2C');
    } else if (req.query[param]) {
      params_string += '&' + param + '=' + req.query[param];
    }
  }
  params_string = '?' + params_string.slice(1, params_string.length);
  params_string +=
    '&number=10&limitLicense=false&offset=0&ranking=0&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true';

  console.log(params_string);
  console.log('x');

  var result = await unirest
    .get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com` +
        `/recipes/searchComplex` +
        params_string
    )
    .header('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com')
    .header('X-RapidAPI-Key', process.env.RAPID_API_KEY);

  //console.log("RESULTS", result.body.results);
  //console.log("DATA",result.body.results);
  var data = result.body.results;
  for (var a in data) {
    var recipe = data[a];
    var ingredients = [];
    var missed_ingredients = [];
    var used_ingredients = [];
    var unused_ingredients = [];
    var all_ingredients = [];

    for (var b in recipe.analyzedInstructions[0].steps) {
      var step = recipe.analyzedInstructions[0].steps[b];

      for (var c in step.ingredients) {
        var ingredient = step.ingredients[c].name;
        if (ingredients.indexOf(ingredient) === -1) {
          ingredients.push(ingredient);
          all_ingredients.push(ingredient);
        }
      }
    }

    for (var d in recipe.usedIngredients) {
      var ingredient = recipe.usedIngredients[d].name;
      if (used_ingredients.indexOf(ingredient) === -1) {
        used_ingredients.push(ingredient);
        all_ingredients.push(ingredient);
      }
    }

    for (var e in recipe.unusedIngredients) {
      var ingredient = recipe.unusedIngredients[e].name;
      if (unused_ingredients.indexOf(ingredient) === -1) {
        unused_ingredients.push(ingredient);
        all_ingredients.push(ingredient);
      }
    }

    for (var f in recipe.missedIngredients) {
      var ingredient = recipe.missedIngredients[f].name;
      if (missed_ingredients.indexOf(ingredient) === -1) {
        missed_ingredients.push(ingredient);
        all_ingredients.push(ingredient);
      }
    }

    //console.log(ingredients);
    //console.log(missed_ingredients);
    //console.log(unused_ingredients);
    //console.log(used_ingredients);

    data[a]['INGREDIENTS'] = ingredients;
    data[a]['MISSEDINGREDIENTS'] = missed_ingredients;
    data[a]['UNUSEDINGREDIENTS'] = unused_ingredients;
    data[a]['USEDINGREDIENTS'] = used_ingredients;
    data[a]['ALLINGREDIENTS'] = all_ingredients;
    //break;

    break;
  }

  Recipes.findOneAndUpdate({ id: data[0].id }, data[0], { upsert: true, new: true }, function(
    err,
    doc
  ) {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
    //return res.send(doc);
    console.log('DOC', doc);
    return res.json(result.body.results);
  });

  //res.json(result.body.results);

  //console.log(result.body.results[0]);
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
