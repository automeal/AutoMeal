import React from 'react';
import { Button, Card, Grid, Header, Image, List, Modal, Segment } from 'semantic-ui-react';

const RecipeCard = props => {
  return (
    <Card>
      <Image src={props.image} />
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Modal trigger={<Button>Read more</Button>}>
          <Modal.Header>
            Result {props.currItem + 1} of{' '}
            {!props.recipeSearchResults || !props.recipeSearchResults.length
              ? 0
              : props.recipeSearchResults.length}
          </Modal.Header>
          <Modal.Content image scrolling>
            <Image size="medium" src={props.image} wrapped />
            <Modal.Description>
              <Header>{props.title}</Header>
              <List celled horizontal items={props.cuisines} />
              <List celled horizontal items={props.dishTypes} />
              <br />
              Prep Time: {props.preparationMinutes}
              <br />
              Cook Time: {props.cookingMinutes}
              <br />
              Servings: {props.servings}
              <br />
              Calories: {props.calories}
              <br />
              Protein: {props.protein}
              <br />
              Fat: {props.fat}
              <br />
              Carbs: {props.carbs}
              <br />
              <List.Header>Cooking Instructions</List.Header>
              <List
                ordered
                items={
                  !props.analyzedInstructions || !props.analyzedInstructions.length
                    ? ['no recipe instructions']
                    : props.analyzedInstructions[0].steps.map(step => step.step)
                }
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Card.Content>
    </Card>
  );
};

export default RecipeCard;
