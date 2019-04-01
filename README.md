# AutoMeal

![](./img/logo.jpg)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

_Note: If deployed with Heroku, please set environment variables in your Heroku app (Settings -> Config Vars -> Reveal Config Vars) and then set **RAPID_API_KEY** and **JWT_SECRET**, below -- MONGODB_URI is automatically set by Heroku configuration._

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

In the base folder `AutoMeal/` create the following in a `.env` file:

```
MONGODB_URI=<getMongoCloudServerAccount>
RAPID_API_KEY=<getRapidAPIKey>
JWT_SECRET=<chooseSecret>
```

These keys' values must be set, in order to communicate with the database, fetch recipe data, and authenticate users throughout their web session.

[Sign up](https://www.mongodb.com/cloud/atlas) for MongoDB Atlas (cloud database).

[Sign up](https://rapidapi.com/spoonacular/api/recipe-food-nutrition) for RapidAPI account to get a RecipeAPI key.

`JWT_SECRET` can be set to a string of your choice.

Run development environment with  
`$ npm run dev`
