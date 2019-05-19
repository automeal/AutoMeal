import React from 'react';
import { Card, Grid, Header, Segment, Loader, Dimmer } from 'semantic-ui-react';
import RecipeCard from '../RecipeCard';

const RecipeResults = props => {
  return (
    <Grid.Column width="12">
      <Segment attached="top" color="green">
        <Header as="h2" textAlign="center">
          {props.header}
        </Header>
      </Segment>
      <Segment attached="bottom">
        <Card.Group stackable itemsPerRow={props.itemsPerRow}>
          {!props.recipeSearchResults || !props.recipeSearchResults.length ? (
            <Dimmer active inverted>
              <br />
              <br />
              <br />
              <br />
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            props.recipeSearchResults.map((item, key) => (
              <RecipeCard
                image={item.image}
                title={item.title}
                numberOfResults={
                  !props.recipeSearchResults || !props.recipeSearchResults.length
                    ? 0
                    : props.recipeSearchResults.length
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
            ))
          )}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default RecipeResults;
