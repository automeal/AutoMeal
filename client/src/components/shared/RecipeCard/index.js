import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

import recipe from './recipe.jpg';

class RecipeCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card
        image={this.props.item.image}
        header={this.props.item.title}
        meta={'Ingredients: ' + this.props.item.extendedIngredients}
        description={'Time to Make: ' + this.props.item.readyInMinutes}
        extra="Read more"
        width="33 %"
      />
    );
  }
}

export default RecipeCard;
