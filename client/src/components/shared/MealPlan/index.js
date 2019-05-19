import React from 'react';
import { Card, Grid, Header, Segment } from 'semantic-ui-react';
import RecipeCard from '../RecipeCard';

const Recipe = props => {
  console.log('hello');
  console.log(props.recipeSearchResults);
  return (
    <Grid.Column width="12">
      <Segment attached="top" color="green">
        <Header as="h2" textAlign="center">
          Recipe History
        </Header>
      </Segment>
      <Segment attached="bottom">
        <Card.Group stackable itemsPerRow={3}>
          {!props.recipeSearchResults.recipes || !props.recipeSearchResults.recipes.length
            ? ['No meal plan is generated']
            : props.recipeSearchResults.recipes.map((item, key) => (
                <RecipeCard
                  image={item.image}
                  title={item.title}
                  numberOfResults={
                    !props.recipeSearchResults.recipes || !props.recipeSearchResults.recipes.length
                      ? 0
                      : props.recipeSearchResults.recipes.length
                  }
                  currItem={key}
                  cuisine={item.cuisine}
                  dishTypes={item.dishTypes}
                  preparationMinutes={item.preparationMinutes}
                  cookingMinutes={item.cookingMinutes}
                  servings={item.servings}
                  calories={item.calories}
                  protein={item.protein}
                  fat={item.fat}
                  carbs={item.carbs}
                  analyzedInstructions={item.analyzedInstructions}
                />
              ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default Recipe;
