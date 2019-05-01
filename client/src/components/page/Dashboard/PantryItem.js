import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';

class PantryItem extends Component {
  handleDelete() {
    console.log('Click!');
  }

  handleMove() {
    console.log('Click!');
  }

  render() {
    return (
      <Label size="large">
        <Icon name="delete" onClick={this.handleDelete} />
        {'  '}
        {this.props.item}
        {'  '}
        <Label.Detail>
          <Icon name="angle double right" onClick={this.handleMove} />
        </Label.Detail>
      </Label>
    );
  }
}

export default PantryItem;
