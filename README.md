# AutoMeal

![](./img/logo.jpg)

Find recipes based on ingredients you already have at home.

Join a community of enthusiastic home cooks.

More convincing words.

### Development

Clone this repository  
`$ git clone https://github.com/automeal/AutoMeal.git`

Go into source folder  
`$ cd AutoMeal`

Install dependencies with npm script  
`$ npm run i`

create a folder **config** with a file **default.json** that has the following:  
`{ "mongoURI": "<getMongoCloudServerAccount>", "rapidAPIKey": "<getRapidAPIKey>", "jwtSecret": "<chooseSecret>" }`

These keys must be attained in order to fetch recipe data.

[Sign up](https://www.mongodb.com/cloud/atlas) for MongoDB Atlas (cloud database).

[Sign up](https://rapidapi.com/spoonacular/api/recipe-food-nutrition) for RapidAPI account to get a RecipeAPI key.

Run development environment with  
`$ npm run dev`
