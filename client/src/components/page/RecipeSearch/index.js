import React, { Component } from 'react';
import axios from 'axios';
import { Button, Checkbox, Dropdown, Grid, Header, List, Segment } from 'semantic-ui-react';

import SearchBox from '../../shared/Search';
import RecipeResults from '../../shared/RecipeResults';

class RecipeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // MEAL PLAN
      // Recipe query
      desiredMeal: '',
      // Checkboxes
      includePantry: true,
      filterdietary_restrictions: true,
      filterAllergies: true,
      // Additional search boxes
      includeAdditionalIngredients: [],
      addIngredient: '',
      excludeAdditionalIngredients: [],
      ignoreIngredient: '',
      // Cuisine choice
      cuisine: [],
      // Recipe Search Result
      recipeSearchResults: [],
      // For the popup
      open: false
    };
    //this.handleDelete = this.handleMove.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/users/current', { Authorization: localStorage.getItem('jwtToken') })
      .then(user => {
        this.setState({ currUser: user.data });
      });
  }

  handleCheck = (event, result) => {
    this.setState({ [result.name]: !result.value });
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleResultSelect = (prop, result) => {
    const newItem = result.name;

    // If pantry item already present do not add again
    if (this.state.currUser[prop].includes(newItem)) {
      console.log(newItem, 'already present in', prop);
      return;
    }
    if (prop === 'pantry' && this.state.currUser.allergies.includes(newItem)) {
      console.log('DANGER: Item considered an allergy!');
      return;
    }

    //console.log(`currUser: ${this.state.currUser}`);
    //console.log(`currProp: ${prop}, newItem: ${newItem}`);

    //Update state immediately, no need to to wait for the DB to update UI
    this.state.currUser[prop].push(newItem);
    this.setState({
      [prop]: '',
      currUser: this.state.currUser
    });

    axios
      .patch(`/api/users/${this.state.currUser.id}`, {
        [prop]: newItem
      })
      .then(() => {
        console.log('Database updated', prop, newItem);
      });
    //console.log(`Hello, field: ${this.state.currUser[list]}, this.state[newItem]: ${newItem}`);
  };

  handleCuisine = (event, res) => {
    this.setState({ cuisine: [...this.state.cuisine, res.value[0]] });
    console.log(this.state.cuisine);
  };

  getRecipe = () => {
    axios
      .get(
        `/recipeAPI/recipes/complexRecipe/?query=${this.state.desiredMeal}` +
          `&cuisine=${this.state.cuisine.join('%2C+')}` +
          `&diet=${this.state.currUser.dietary_restrictions.join('%2C+')}` +
          `&includeIngredients=${this.state.includeAdditionalIngredients.join('%2C+')}` +
          `&excludeIngredients=${this.state.excludeAdditionalIngredients.join('%2C+')}` +
          `&intolerances=${
            this.state.filterAllergies ? this.state.currUser.allergies.join('%2C+') : ''
          }` +
          `&maxCalories=${this.state.currUser.calories.max}` +
          `&mealCount=${this.state.currUser.mealCount}` +
          `&useMaxCarbs=true` +
          `&useMaxFat=true`
      )
      .then(res => {
        console.log(res);
        this.setState({ recipeSearchResults: res.data });
      })
      .catch(err => console.log(err));
  };

  handleAdditionalIngredients = (name, value) => {
    console.log('name:');
    console.log(name);
    console.log('value:');
    console.log(value);
    const newItem = value.name;
    this.setState(
      name === 'addIngredient'
        ? { includeAdditionalIngredients: [...this.state.includeAdditionalIngredients, newItem] }
        : { excludeAdditionalIngredients: [...this.state.excludeAdditionalIngredients, newItem] }
    );
  };

  render() {
    return (
      <Grid stackable style={{ padding: '20px' }}>
        <Grid.Column width="4">
          <Segment attached="top" textAlign="center" color="green">
            <Header as="h1">Complex Recipe Search</Header>
          </Segment>
          <Segment attached="bottom">
            <br />
            <br />
            Complex Recipe Search
            <br />
            <br />
            <Checkbox
              name="includePantry"
              value={this.state.includePantry}
              defaultChecked={this.state.includePantry}
              onChange={this.handleCheck.bind(this)}
              toggle
              label="Include pantry"
            />
            <br />
            <Checkbox
              name="filterdietary_restrictions"
              value={this.state.filterdietary_restrictions}
              defaultChecked={this.state.filterdietary_restrictions}
              onChange={this.handleCheck.bind(this)}
              toggle
              label="Filter out recipes that include dietary restrictions"
            />
            <br />
            <Checkbox
              name="filterAllergies"
              value={this.state.filterAllergies}
              defaultChecked={this.state.filterAllergies}
              onChange={this.handleCheck.bind(this)}
              toggle
              label="Filter out recipes that include allergies"
            />
            <br />
            <br />
            <br />
            Dish
            <br />
            <SearchBox
              route="recipes/recipeAutocomplete/"
              handleResult={(name, value) => this.setState({ [name]: [value.title] })}
              placeholder="'burger', 'soup', etc"
              value={this.state.desiredMeal}
              name="desiredMeal"
              onChange={this.handleChange.bind(this)}
            />
            <br />
            <List.Header>Additional Ingredients to Use:</List.Header>
            <List
              items={
                !this.state.includeAdditionalIngredients ||
                !this.state.includeAdditionalIngredients.length
                  ? ['no additional ingredients to include']
                  : this.state.includePantry
                  ? this.state.includeAdditionalIngredients.concat(this.state.currUser.pantry)
                  : this.state.includeAdditionalIngredients
              }
            />
            <SearchBox
              route="ingredients"
              handleResult={this.handleAdditionalIngredients.bind(this)}
              placeholder="Include ingredient"
              value={this.state.addIngredient}
              name="addIngredient"
              onChange={this.handleChange.bind(this)}
            />
            <br />
            <List.Header>Additional Ingredients to Exclude:</List.Header>
            <List
              items={
                !this.state.excludeAdditionalIngredients ||
                !this.state.excludeAdditionalIngredients.length
                  ? ['no additional ingredients to exclude']
                  : this.state.excludeAdditionalIngredients
              }
            />
            <SearchBox
              route="ingredients"
              handleResult={this.handleAdditionalIngredients.bind(this)}
              placeholder="Exclude ingredient"
              value={this.state.ignoreIngredient}
              name="ignoreIngredient"
              onChange={this.handleChange.bind(this)}
            />
            <br />
            <Dropdown
              onChange={this.handleCuisine.bind(this)}
              value={this.state.cuisine}
              name="cuisine"
              placeholder="Cuisine"
              clearable
              multiple
              search
              selection
              fluid
              options={[
                { key: 'African', value: 'African', text: 'African' },
                { key: 'American', value: 'American', text: 'American' },
                { key: 'British', value: 'British', text: 'British' },
                { key: 'Cajun', value: 'Cajun', text: 'Cajun' },
                { key: 'Caribbean', value: 'Caribbean', text: 'Caribbean' },
                { key: 'Chinese', value: 'Chinese', text: 'Chinese' },
                { key: 'Eastern', value: 'Eastern', text: 'Eastern' },
                { key: 'European', value: 'European', text: 'European' },
                { key: 'French', value: 'French', text: 'French' },
                { key: 'German', value: 'German', text: 'German' },
                { key: 'Greek', value: 'Greek', text: 'Greek' },
                { key: 'Halal', value: 'Halal', text: 'Halal' },
                { key: 'Indian', value: 'Indian', text: 'Indian' },
                { key: 'Irish', value: 'Irish', text: 'Irish' },
                { key: 'Italian', value: 'Italian', text: 'Italian' },
                { key: 'Japanese', value: 'Japanese', text: 'Japanese' },
                { key: 'Jewish', value: 'Jewish', text: 'Jewish' },
                { key: 'Korean', value: 'Korean', text: 'Korean' },
                { key: 'Kosher', value: 'Kosher', text: 'Kosher' },
                { key: 'Latin American', value: 'Latin American', text: 'Latin American' },
                { key: 'Mexican', value: 'Mexican', text: 'Mexican' },
                { key: 'Middle Eastern', value: 'Middle Eastern', text: 'Middle Eastern' },
                { key: 'Nordic', value: 'Nordic', text: 'Nordic' },
                { key: 'Southern', value: 'Southern', text: 'Southern' },
                { key: 'Spanish', value: 'Spanish', text: 'Spanish' },
                { key: 'Thai', value: 'Thai', text: 'Thai' },
                { key: 'Vietnamese', value: 'Vietnamese', text: 'Vietnamese' }
              ]}
            />{' '}
            <br />
            <Button onClick={this.getRecipe.bind(this)}>Search for Recipes</Button>
          </Segment>
        </Grid.Column>
        {!this.state.recipeSearchResults || !this.state.recipeSearchResults.length ? (
          ''
        ) : (
          <RecipeResults recipeSearchResults={this.state.recipeSearchResults} />
        )}
      </Grid>
    );
  }
}

export default RecipeSearch;
