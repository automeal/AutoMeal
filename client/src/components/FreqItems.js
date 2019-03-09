import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

class FreqItems extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return this.props.pantry.map( (item) => (
        /*<PantryItem key={item.id} item={item} toggleAvailable=
        {this.props.toggleAvailable} delItem = {this.props.delItem} />*/
        <PantryItem key={item.id} item={item} toggleAvailable=
        {this.props.toggleAvailable} delItem = {this.props.delItem} />
    ))
  }
}

// Proptypes
FreqItems.propTypes = {
    pantry: PropTypes.array.isRequired,
    toggleAvailable: PropTypes.func.isRequired,
    delItem: PropTypes.func.isRequired,
}

export default FreqItems;
