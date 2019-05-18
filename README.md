# AutoMeal

![](./img/logo.jpg)

[![Build Status](https://travis-ci.com/automeal/AutoMeal.svg?branch=master)](https://travis-ci.com/automeal/AutoMeal)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Find recipes based on ingredients you already have at home.

Join a community of enthusiastic home cooks.

What are you waiting for? Start cooking [now](https://automeal.herokuapp.com)!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

> _Note_: If you plan on deploying your own Heroku app of this repo  
> Please set the environment variables in your Heroku app  
> **Settings -> Config Vars -> Reveal Config Vars**  
> and then set  
> **RAPID_API_KEY**, **JWT_SECRET**, and **PRODUCTION_MONGODB_URI**, as dictated below.  
> You will also need to add MongoDB as an add-on  
> **Resources -> Add-ons** and then enter **mLab MongoDB**

### Source Compilation & Development

Clone this repository

```
git clone https://github.com/automeal/AutoMeal.git
```

Go into source folder

```
cd AutoMeal
```

Install dependencies with npm script

```
npm run i
```

In the following folder `AutoMeal/server/` create the following in a `.env` file:

```
# move to folder
cd server/
touch .env
```

Open the file with your preferred editor and paste the following

```
PRODUCTION_MONGODB_URI=<getMongoCloudServerAccount>
DEV_MONGODB_URI=<getMongoCloudServerAccount>
TEST_MONGODB_URI=<getMongoCloudServerAccount>
RAPID_API_KEY=<getRapidAPIKey>
JWT_SECRET=<chooseSecretString>
```

These keys' values must be set, in order to communicate with the database, fetch recipe data, and authenticate users throughout their web session.

[Sign up](https://www.mongodb.com/cloud/atlas) for MongoDB Atlas (cloud database).  
To get the connection string URI, click **Connect** on your database cluster and then **Connect Your Application -> Connection String Only -> Copy** to copy the string to your clipboard.

> _Note:_ you can create separate databases by creating a **New Project** under the **Context** dropdown.  
> You only need `PRODUCTION_MONGODB_URI` if you plan on launching your own Heroku app.  
> You only need `TEST_MONGODB_URI` if you plan on running the tests.

[Sign up](https://rapidapi.com/spoonacular/api/recipe-food-nutrition) for RapidAPI account to get a RecipeAPI key.

`JWT_SECRET` can be set to a string of your choice.

Run development environment with

```
npm run dev
```
