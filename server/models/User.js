const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
  Not for use yet, this SHOULD be in a different collection in MongoDB. Because many users can have the same
  recipes in their meal plans, no need to duplicate data over and over. How to get this data from the meal
  plans object in Users then? Should do an aggregate call instead of findOne and user the $lookup operator
  to join the collections Users and Recipes together 
  (something like $lookup on User.mealPlans.recipes.day.num.recipeId with Recipe.recipeId)
*/
const RecipeSchema = new Schema(
  {
    likes: { type: Number, default: 0 },
    id: Number,
    ALLINGREDIENTS: Array,
    INGREDIENTS: Array,
    MISSEDINGREDIENTS: Array,
    UNUSEDINGREDIENTS: Array,
    USEDINGREDIENTS: Array,
    __v: Number,
    aggregateLikes: Number,
    analyzedInstructions: Array,
    calories: Number,
    carbs: String,
    cheap: Boolean,
    cookingMinutes: Number,
    creditText: String,
    creditsText: String,
    cuisines: Array,
    dairyFree: Boolean,
    diets: Array,
    dishTypes: Array,
    fat: String,
    gaps: String,
    glutenFree: Boolean,
    healthScore: Number,
    image: String,
    imageType: String,
    ketogenic: Boolean,
    lowFodmap: Boolean,
    missedIngredientCount: Number,
    missedIngredients: Array,
    occasions: Array,
    preparationMinutes: Number,
    pricePerServing: Number,
    protein: String,
    readyInMinutes: Number,
    servings: Number,
    sourceName: String,
    sourceUrl: String,
    spoonacularScore: Number,
    spoonacularSourceUrl: String,
    sustainable: Boolean,
    title: String,
    unusedIngredients: Array,
    usedIngredientCount: Number,
    usedIngredients: Array,
    vegan: Boolean,
    vegetarian: Boolean,
    veryHealthy: Boolean,
    veryPopular: Boolean,
    weightWatcherSmartPoints: Number,
    whole30: Boolean,
    winePairing: Object
  },
  { strict: false }
);

/*
  Should not be in a different collection (think of it as a table in MongoDB) from Users. It's a Schema because 
  it's easier to integrate into mongoose and more clear what fields a Meal should have instead of just calling 
  it an Array of Objects in UserSchema's mealPlans field.
*/
const MealSchema = new Schema({
  /*
  One meal plan has any number of recipes per seven days, so the structure should be something like:

  Object(){
    "DayOne" : {
      "RecipeOne" : {
        "recipeID" : 12345,
        "removed" : False,
        "liked/favorited" : False,
      },
      "RecipeTwo" : {
        ...
      }
      ...
      "RecipeNth" : {
        ...
      }
    },
    "DayTwo" : {
      ... 
    }
    ....
    "DaySeven": {
      ...
    }
  }

  It would look more like 
  Object(){ //Recipes Object
    Array()[  //Days
      Array()[ //recipes for each day
        Object(){ //recipe object itself
          recipeID : 12345,
          removed : False,
          liked : False,
        }
      ]
    ]
  }

  */
  recipes: {
    type: Array,
    default: []
  },

  /*
  Pantry used for this specific mealplan, initially at least, if recipes can be removed/changed mid meal plan,
  it could be trickier.
  
  Actually, if the dashboard's pantry is changed, and a new meal plan is generated, then it should be considered 
  a new meal plan/pantry, so history of pantries does not need to be stored since it's one pantry per mealplan
  which is stored here below anyway.

  If a new meal plan is not generated, for example, change my pantry and then go to the meal plan page, and change
  individual recipes and expect those to update based on new pantry, then historic pantry information may have to be
  stored, An array of pantries (which are already an array, so Array of arrays)
  */
  pantry: {
    type: Array,
    default: []
  },

  /*
  Assuming you need to generate a new plan to change the plan type, calories, personCount, etc.
  Then no need to store historic information per meal plan, just once
  */
  // Histrorical Data
  planType: Number,
  calories: Object,
  personCount: Number,
  mealCount: Number,

  // Use to update/push a new mealplan into the history
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'Currently generating meal plan'
  }
});

// Create Schema
const UserSchema = new Schema({
  // Credentials/Authorization/Metadata
  full_name: {
    type: String,
    required: true
  },
  displayName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  // last_password_update: {
  //   type: Date,
  //   default: Date.now
  // },

  // Pantry for current meal plan
  pantry: {
    type: Array,
    default: ['salt', 'pepper', 'oil', 'lettuce', 'milk']
    // have this be an object with the array and creation date so that we may refresh weekly
  },
  dietary_restrictions: {
    type: Array,
    default: []
  },
  allergies: {
    type: Array,
    default: []
  },
  mealPlans: [MealSchema],

  // Current Data
  planType: {
    type: Number,
    default: 7
  },
  calories: {
    type: Object,
    default: {
      activeIndex: 0,
      max: 2500,
      min: 1800,
      selected: 'rec'
    }
  },
  // personCount: Number,
  mealCount: {
    type: Number,
    default: 3
  }
});

// Cache types of each field of User in arrayDBFields, only need to do this once
const arrayDBFields = [];
for (path in UserSchema.paths) {
  // console.log(path, UserSchema.paths[path] instanceof mongoose.Schema.Types.Array);
  if (UserSchema.paths[path] instanceof mongoose.Schema.Types.Array) {
    arrayDBFields.push(path);
  }
}
const arrayDBFieldsLower = [];
for (path in UserSchema.paths) {
  // console.log(path, UserSchema.paths[path] instanceof mongoose.Schema.Types.Array);
  if (UserSchema.paths[path] instanceof mongoose.Schema.Types.Array) {
    arrayDBFields.push(path.toLowerCase());
  }
}
// console.log(arrayDBFields);

// Callback ver. but want to cache fields before being imported, not after
// UserSchema.eachPath((pathname, schematype) => {
// console.log("PathName",pathname,"Type", schematype instanceof mongoose.Schema.Types.Array );
// });

const User = mongoose.model('users', UserSchema);
const Recipes = mongoose.model('recipes', RecipeSchema);
module.exports = User;
module.exports.Recipes = Recipes;
// Monkeypatch arrayDBFields to User/module.exports, probably better ways to do this but will not change existing import code
module.exports.arrayDBFields = arrayDBFields;
// Case insensitive cache of arrayDBFields, probably not neccessary though
module.exports.arrayDBFieldsLower = arrayDBFieldsLower;

// Additional fields
// dietary pref (vegan/kosher)
// weekly meal plan
// previous meal plans
// maybe just one array and we retrieve last/first meal plan as current
// fave recipes
// recently searched items (recipes/ingredients/)
