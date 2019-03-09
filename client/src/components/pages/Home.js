import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import ex1 from '../../img/FrqItmEx1.jpg'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={ex1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
  );
  }
}

// Proptypes
Home.propTypes = {
    pantry: PropTypes.array.isRequired,
    toggleAvailable: PropTypes.func.isRequired,
    delItem: PropTypes.func.isRequired,
}

export default Home;
