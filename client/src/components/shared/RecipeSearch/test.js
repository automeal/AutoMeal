import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button, Grid, Image, Form } from 'semantic-ui-react';

class SeachBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      currentRecipe: []
    };
  }

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  handleSubmit = async () => {
    const API_KEY = '021aad57378e3923e1d02ac26829a7cd';

    const req = await fetch(
      `https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${
        this.state.term
      }`
    );
    const res = await req.json();
    this.setState({
      term: '',
      currentRecipe: res.recipes[0]
    });
    console.log(this.state.searchResults);
  };
  render() {
    const recipe = this.state.currentRecipe;
    return (
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <div className="Search">
          <Form onSubmit={this.handleSubmit}>
            <Form.Input value={this.state.term} onChange={this.onChange} />
            <Button>Search!</Button>
          </Form>
          <h3>Title of the recipe: {recipe.title}</h3>
          <Image src={recipe.image_url} height="100" alt={this.state.term} />
        </div>
      </Grid>
    );
  }
}

export default SeachBar;
