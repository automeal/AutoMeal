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
### About AutoMeal

Our goal is to create a web application that supplies users with recipes collected from the internet to form a daily or weekly meal plan based on the items they already have in their refrigerator or pantry and in accordance with their dietary and nutritional goals and limitations.

Many people do not plan the meals they will eat during the day or week and this can waste time and money. In addition to this, many people do not have enough time to cook for themselves and they resort to eating out or ordering takeout. Planning your meals throughout the week can properly prepare you to eat healthier, save time, and save money. Oftentimes, people buy the same groceries over and over again but do not know exactly what they want to eat. By compiling recipes from the internet and allowing users to input the ingredients that they have on hand (or would like to eat), our application will output recipes and meal plans based on each user’s specific needs. 


### How to Use AutoMeal (User Guide)

Step 1:
If you're a new user, sign up for an account with our site. This will allow you to maintain a profile that stores your pantry, dietary restrictions, and allergies, and recipes that you enjoy

Step 2:
Fill out the survey to let us know what your preferences are. These preferences are saved with your profile so that all results will be accomodating YOUR needs.

Step 3:
Fill in your virtual pantry with items you keep in your kitchen so recipes found include items you already have at home.

Step 4:
Using the answers from your survey, recipes and/or a meal plan can be generated based off of your preferences. The possibilities are endless!

### AutoMeal Future Iterations and Reflection:

Future Iterations:

    1. Implement a barcode scanner to scan food and add specific items directly into user's pantry
    2. More advanced safeguards for recipe searches
    3. Implement a grocery list in addition to the pantry
    4. Interfacing with online retailers
    5. Allow for recipe “multiplication” so a user could add more serving sizes than the serving size provided by the recipe,     and have the ingredients update to match the requirements for this augmented serving

Reflection: 
    
Challenges we were able to overcome and future iterations from our requirements document that we were able to implement       include suggesting random recipes if the user is unsure of what to eat as well as incorporating various cuisines into the     recipe search (i.e. Caribbean, American, Japanese, etc.). We were able to improve our Mobile UI through the use of             Semantic UI and fix the issues with our mobile display.  
   
Challenges we still face include the limiations of the Spoonacular API and the calls it is able to generate as well as         finding an adequate number of unique recipes for users with very limited dietary restrictions.
    
More testing for users with various combinations of diets, intolerances, and health preferences is needed to ensure all       users have the same experience. 
