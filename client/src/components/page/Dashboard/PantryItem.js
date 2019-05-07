import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';

class PantryItem extends Component {
  // TO DO: Function to delete pantry item
  handleDelete() {
    console.log('Click!');
  }

  // TO DO: Function to move pantry item to a grocery list
  handleMove() {
    console.log('Click!');
  }

  render() {
    const divStyle = {
      margin: '5px',
      padding: '10px'
    };
    return (
      <Label color="green" size="large" textAlign="center" style={divStyle}>
        <Icon name="delete" onClick={this.handleDelete} />
        {'  '} {'  '}
        {this.props.item}
        <Label.Detail>
          <Icon name="angle double right" onClick={this.handleMove} />
        </Label.Detail>
      </Label>
    );
  }
}

export default PantryItem;
