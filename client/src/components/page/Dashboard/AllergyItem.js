import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';

class AllergyItem extends Component {
  // TO DO: Function to delete allergy
  handleDelete() {
    console.log('Click!');
  }

  render() {
    const divStyle = {
      margin: '5px',
      padding: '10px'
    };
    return (
      <Label color="red" size="large" textAlign="center" style={divStyle}>
        <Icon name="delete" onClick={this.handleDelete} />
        {'  '} {'  '}
        {this.props.item}
      </Label>
    );
  }
}

export default AllergyItem;
