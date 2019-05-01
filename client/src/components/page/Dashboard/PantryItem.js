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
    const divStyle = {
      padding: '5px'
    };
    return (
      <div style={divStyle}>
        <Label color="green" size="large" textAlign="center">
          <Icon name="delete" onClick={this.handleDelete} />
          {'  '} {'  '}
          {this.props.item}
          <Label.Detail>
            <Icon name="angle double right" onClick={this.handleMove} />
          </Label.Detail>
        </Label>
      </div>
    );
  }
}

export default PantryItem;
