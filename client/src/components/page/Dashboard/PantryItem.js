import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import axios from 'axios';

class PantryItem extends Component {
  constructor(props) {
    super(props);
    //this.onIconClick.bind(this);
    //this.onLabelClick.bind(this);
  }

  onIconClick() {
    //Why
    this.props.onIconClick(this.props.item, this.props.db_field_name);
  }

  onLabelClick() {
    this.props.onLabelClick();
  }

  //Basically, pass the parent's function as an argument, which shows up in this.props
  //Then, onclick, call that function, with another argument that was passed to this component,
  //item, which is in this.props.item. Then, the parent handles the state stuff.
  render() {
    const divStyle = {
      margin: '5px',
      padding: '10px'
    };
    return (
      <Label color="green" size="large" textAlign="center" style={divStyle}>
        <Icon name="delete" onClick={this.onIconClick.bind(this)} />
        {'  '} {'  '}
        {this.props.item}
        {/*<Label.Detail>
          <Icon name="angle double right" onClick={this.onLabelClick.bind(this)} />
        </Label.Detail>*/}
      </Label>
    );
  }
}

export default PantryItem;
