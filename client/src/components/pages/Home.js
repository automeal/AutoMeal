import React, { Component } from "react";
import PropTypes from "prop-types";
// import Carousel from "../../components/Carousel";

// import ex1 from "../../img/FrqItmEx1.jpg";

class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <h1>Frequently Used Items</h1>
        <h1>Based on Your Previous Meals...</h1>
        <h1>Highest Rated Recipes</h1>
      </div>
    );
  }
}

// Proptypes
Home.propTypes = {
  pantry: PropTypes.array.isRequired,
  toggleAvailable: PropTypes.func.isRequired,
  delItem: PropTypes.func.isRequired
};

export default Home;
