import React, { Component } from "react";
import axios from "axios";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ""
    };
  }

  componentDidMount() {
    axios
      .get("/api/recipes")
      .then(res => this.setState({ word: res.data.recipes[0].title }));
  }

  render() {
    return <div>{this.state.word}</div>;
  }
}

export default Recipes;
