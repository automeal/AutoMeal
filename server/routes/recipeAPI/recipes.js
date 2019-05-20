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

/**
 * FROM https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  var captures = [];
  for (var a in data) {
    var recipe = data[a];

    var ingredients = [];
    var missed_ingredients = [];
    var used_ingredients = [];
    var unused_ingredients = [];
    var all_ingredients = [];

    if (
      recipe === undefined ||
      recipe.analyzedInstructions === undefined ||
      recipe.analyzedInstructions[0] === undefined
    ) {
      console.log(recipe.analyzedInstructions);
      continue;
    }

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

    //console.log("About to update?")
    //break;
    var err,
      doc = await Recipes.findOneAndUpdate({ id: data[a].id }, data[a], {
        upsert: true,
        new: true
      });
    if (err) {
      console.log(err);
      throw new Error('Bad Update? The heck');
      return err, doc;
      //return res.status(500).send( { error: err });
    }
    captures.push(data[a]);
  }
  return captures;
}

async function updateMealPlan(data, _id, mealPlans, alreadyUsedRecipes) {
  var recipe = null;

  //Let's not choose a random recipe since it should be sorted by most releveant first
  var rand = 0;
  while (data.length > 0) {
    //var rand = Math.floor(Math.random() * data.length);
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

  mealPlans[mealPlans.length - 1]['recipes'].push(recipe);

  console.log('Recipe ID (from Spoonacular:', recipe.id);

  return mealPlans;
}

function chooseRecipe(keys, recipes_used_map) {
  var recipe = null;

  shuffle(keys);

  //console.log(recipes_used_map['all']);
  //console.log(keys);

  for (var i = 0; i < keys.length; i++) {
    var arr = recipes_used_map['all'][keys[i]]; //Get recipe arr

    //var recipe = null;
    for (var b = 0; b < arr.length; b++) {
      if (arr[b] === undefined) console.log('index', b, 'undefined?');

      //recipe = arr[0]; // Most relevant recipe first
      if (arr[b] === undefined || recipes_used_map['used'].includes(arr[b].id)) {
        continue;
      }

      recipe = arr[b];
      break;
    }

    if (recipe !== null) {
      recipes_used_map['used'].push(recipe.id);
      recipes_used_map['all'][keys[i]] = arr;
      return recipe;
    }
  }

  console.log(recipes_used_map['used']);
  console.log(recipe);
  return recipe;
}

// @route   POST recipeAPI/recipes/generateMealPlan
router.post('/generateMealPlan/', async (req, res) => {
  //const { query, cuisine, diet, includeIngredients, excludeIngredients, intolerances } = req.query;

  const { mealCount, _id, planType, calories } = req.body;

  var mealPlanCount = mealCount - 1; //breakfast generation, also use mutable version careful
  var mealPlans = (await Users.findOne({ _id: _id }, { mealPlans: 1 }))['mealPlans'];

  mealPlans.push({
    //recipes: [],
    days: [],
    created_on: Date.now,
    planType: planType,
    calories: calories,
    mealCount: mealCount,
    status: 0
  });
  //return null;
  await Users.update({ _id: _id }, { mealPlans: mealPlans });

  var params_string = '';
  for (var param in req.query) {
    if (req.query[param] && req.query[param].constructor === Array) {
      //if ( req.query[param].length > 0)
      params_string += '&' + param + '=' + req.query[param].join('%2C');
    } else if (req.query[param]) {
      params_string += '&' + param + '=' + req.query[param];
    }
  }

  var count = '15';
  params_string = '?' + params_string.slice(1, params_string.length);
  params_string +=
    '&number=' +
    count +
    '&limitLicense=false&offset=0&ranking=0&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true';

  console.log('Param String (Server)', params_string);

  var breakfast_string = params_string + '&type=breakfast';
  var recipes_map = {};
  var alreadyUsedRecipes = { arr: [] }; //javascript stuff, can't pass by reference without doing this

  var dish_types = [
    'breakfast',
    'main course',
    'side dish',
    'dessert',
    'appetizer',
    'salad',
    'bread',
    'soup'
    //"beverage", "sauce", "drink"
  ];

  for (var a = 0; a < dish_types.length; a++) {
    var dt = dish_types[a];
    console.log('Collecting ', dt, 'recipes');
    recipes_map[dt] = await sendSpoonacularRequest(params_string + '&type=' + dt);
    await sleep(100); //Don't hammer the recipe API
  }
  console.log('Done Grabbing spoonacular recipes');

  //console.log();

  //var data = await sendSpoonacularRequest(breakfast_string);
  //mealPlans = await updateMealPlan(data, _id, mealPlans, alreadyUsedRecipes);
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  var recipes_used_map = {
    used: [],
    all: recipes_map
  };

  for (var b = 0; b < days.length; b++) {
    var curMealPlan = mealPlans[mealPlans.length - 1];
    curMealPlan.days.push({ recipes: [] });

    switch (days[b]) {
      case 'Monday':
        console.log('day:', days[b]);
        console.log(mealPlanCount);
        curMealPlan.days[b]['recipes'].push(chooseRecipe(['breakfast'], recipes_used_map));

        for (var i = 0; i < mealPlanCount; i++) {
          //console.log('MEAL PLAN COUNT LEFT', mealPlanCount - i);
          //Alternate between main meal and anything else (breakfast unforatunately included)
          if (i % 2 == 0) {
            curMealPlan.days[b]['recipes'].push(
              chooseRecipe(
                ['side dish', 'dessert', 'appetizer', 'salad', 'bread', 'soup'],
                recipes_used_map
              )
            );
          } else {
            curMealPlan.days[b]['recipes'].push(chooseRecipe(['main course'], recipes_used_map));
          }
        }
        break;
      default:
        console.log('def', days[b]);
        curMealPlan.days[b]['recipes'].push(chooseRecipe(['breakfast'], recipes_used_map));

        for (var i = 0; i < mealPlanCount; i++) {
          //console.log('MEAL PLAN COUNT LEFT', mealPlanCount - i);
          //Alternate between main meal and anything else (breakfast unforatunately included)
          if (i % 2 == 0) {
            curMealPlan.days[b]['recipes'].push(
              chooseRecipe(
                ['side dish', 'dessert', 'appetizer', 'salad', 'bread', 'soup'],
                recipes_used_map
              )
            );
          } else {
            curMealPlan.days[b]['recipes'].push(chooseRecipe(['main course'], recipes_used_map));
          }
        }
        break;
      //throw new Error("Not a valid day");
    }

    mealPlans[mealPlans.length - 1] = curMealPlan;
  }

  mealPlans[mealPlans.length - 1]['status'] = 1;
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
    if (param == 'useMaxCarbs') {
      params_string +=
        '&maxCarbs=' + ((req.query.maxCalories * 0.2) / 4 / req.query.mealCount).toString();
    } else if (param == 'useMaxFat') {
      params_string +=
        '&maxFat=' + ((req.query.maxCalories * 0.15) / 9 / req.query.mealCount).toString();
    } else if (req.query[param] && req.query[param].constructor === Array) {
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
