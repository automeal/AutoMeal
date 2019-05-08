import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card
        style={{ width: '420px', height: '320px' }}
        image={this.props.item.image}
        header={this.props.item.title}
        meta={'Ingredients: ' + this.props.item.extendedIngredients}
        description={'ready in minutes: ' + this.props.item.readyInMinutes}
        extra="Read more"
        width="33 %"
      />
    );
  }
}

export default RecipeCard;
