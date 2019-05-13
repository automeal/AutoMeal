import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';

class AllergyItem extends Component {

  constructor(props) {
    super(props);
    //this.onIconClick.bind(this);
  }

  onIconClick(){
    this.props.onIconClick(this.props.item, this.props.db_field_name);
  }

  render() {
    const divStyle = {
      margin: '5px',
      padding: '10px'
    };
    return (
      <Label color="red" size="large" textAlign="center" style={divStyle}>
        <Icon name="delete" onClick={ this.onIconClick.bind(this) }  />
        {'  '} {'  '}
        {this.props.item}
      </Label>
    );
  }
}

export default AllergyItem;
