import React, { Component } from "react";
import PantryItem from "../PantryItem";
import PropTypes from "prop-types";

class Pantry extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return this.props.pantry.map(item => (
      /*<PantryItem key={item.id} item={item} toggleAvailable=
          {this.props.toggleAvailable} delItem = {this.props.delItem} />*/
      <PantryItem
        key={item.id}
        item={item}
        toggleAvailable={this.props.toggleAvailable}
        delItem={this.props.delItem}
      />
    ));
  }
}

// Proptypes
Pantry.propTypes = {
  pantry: PropTypes.array.isRequired,
  toggleAvailable: PropTypes.func.isRequired,
  delItem: PropTypes.func.isRequired
};

export default Pantry;
