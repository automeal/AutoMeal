// creating temporary file to store data manually before backend is created;

const surveyData = {
  selectOpt: {
    mealCount: [
      { val: 3, text: "Three" },
      { val: 5, text: "Five" },
      { val: 2, text: "Two" }
    ],
    planType: [{ val: 7, text: "Weekly" }, { val: 1, text: "Daily" }],
    personCount: [{ val: 1, text: "Individual" }, { val: 4, text: "Family" }]
  },
  dietSpec: [
    { name: "balanced", text: "Balanced Diet (Recommended)" },
    {
      name: "low-carb",
      text: "Low-Carb (Less than 20% of total calories from carbs)"
    },
    {
      name: "low-fat",
      text: "Low-Fat (Less than 15% of total calories from fat)"
    }
  ],
  healthSpec: [
    { name: "no-diet", text: "No Diet" },
    { name: "lacto-vegetarian", text: "Lacto Vegetarian" },
    { name: "ovo-vegetarian", text: "Ovo Vegetarian" },
    { name: "paleo", text: "Paleo" },
    { name: "primal", text: "Primal" },
    { name: "pescetarian", text: "Pescetarian" },
    { name: "vegan", text: "Vegan" },
    { name: "vegetarian", text: "Vegetarain" },
    { name: "ketogenic", text: "Ketogenic" },
    { name: "whole", text: "Whole 30" }
  ],
  intoleranceSpec: [
    { name: "none", text: "None" },
    { name: "dairy", text: "Dairy" },
    { name: "egg", text: "Egg" },
    { name: "gluten", text: "Gluten" },
    { name: "grains", text: "Grains" },
    { name: "seafood", text: "Seafood" },
    { name: "sesame", text: "Sesame" },
    { name: "shellfish", text: "Shellfish" },
    { name: "soy", text: "Soy" },
    { name: "tree-nut", text: "Tree Nut" },
    { name: "wheat", text: "Wheat" },
    { name: "corn", text: "Corn" }
  ],
  mealTypes: {
    3: ["Breakfast", "Lunch", "Dinner"],
    5: ["Breakfast Snack", "Breakfast", "Lunch", "Afternoon Snack", "Dinner"],
    2: ["Brunch", "Dinner"]
  },

  calories: {
    min: 1800,
    max: 2500
  }
};
const API = {
  ID: "YOUR_EDAMAM_ID",
  KEY: "YOUR_EDAMAM_API_KEY",
  URL: "https://api.edamam.com/search?"
};
export { surveyData as Survey, API };
