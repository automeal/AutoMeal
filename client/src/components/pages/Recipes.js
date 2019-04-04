import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Suggestions from "../../components/Suggestions";
import axios from "axios";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      searchText: "",
      searchResults: []
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    axios
      .get(`/recipeAPI/ingredientSearch?search=${event.target.value}`)
      .then(res => {
        this.setState({ searchResults: res.data });
        console.log(this.state.searchResults);
      });
  };

  handleSubmit = async event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="searchText" bsSize="large">
            <ControlLabel>Search for</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              placeholder="Search for..."
              value={this.state.searchText}
              onChange={this.handleChange}
              autoComplete="on"
            />
          </FormGroup>
          <Suggestions results={this.state.searchResults} />
        </form>
      </div>
    );
  }
}

export default Recipes;
