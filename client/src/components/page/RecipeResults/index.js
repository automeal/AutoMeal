import React, { Component } from 'react';
import { Header, Card } from 'semantic-ui-react';

import RecipeCard from '../../shared/RecipeCard/index.js';
import recipeData from './recipes.js';

class RecipeResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: recipeData
    };
  }

  render() {
    const recipeItems = this.state.recipes.map(item => <RecipeCard key={item.id} item={item} />);
    return (
      <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
        <br />
        <Header as="h1" textAlign="center">
          Recipe Results
        </Header>
        <br />
        <Card.Group itemsPerRow={3} raised>
          {recipeItems}
        </Card.Group>
        <br />{' '}
      </div>
    );
  }
}

export default RecipeResults;
