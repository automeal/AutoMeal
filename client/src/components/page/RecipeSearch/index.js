import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Modal,
  Segment
} from 'semantic-ui-react';

import SearchBox from '../../shared/Search';

class RecipeResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // DASHBOARD
      // user data pulled from our DB
      currUser: {},
      // New item being searched and/or added to the respected list
      pantry: '',
      allergies: '',
      dietary_restrictions: '',

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
          `&includeIngredients=${this.state.includeAdditionalIngredients
            // DO NOT concat on call (call at end of this comment block)
            // concat on react side and have includeAdditionalIngredients store all ingredients to be included
            // this allows users to temporarily exclude items that live in their pantry
            // .concat(this.state.currUser.pantry)
            .join('%2C+')}` +
          `&excludeIngredients=${this.state.excludeAdditionalIngredients.join('%2C+')}` +
          `&intolerances=${
            this.state.filterAllergies ? this.state.currUser.allergies.join('%2C+') : ''
          }`
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
      <div>
        <br />
        <Grid stackable>
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
            <Grid.Column width="12">
              <Segment attached="top" color="green">
                <Header as="h2" textAlign="center">
                  Recipe Results
                </Header>
              </Segment>
              <Segment attached="bottom">
                <Card.Group stackable itemsPerRow={3}>
                  {!this.state.recipeSearchResults || !this.state.recipeSearchResults.length
                    ? ['Eat some ice chips']
                    : this.state.recipeSearchResults.map((item, key) => (
                        <Card>
                          <Image src={item.image} />
                          <Card.Content>
                            <Card.Header>{item.title}</Card.Header>
                          </Card.Content>
                          <Card.Content extra>
                            <Modal trigger={<Button>Read more</Button>}>
                              <Modal.Header>
                                Result {key + 1} of{' '}
                                {!this.state.recipeSearchResults ||
                                !this.state.recipeSearchResults.length
                                  ? 0
                                  : this.state.recipeSearchResults.length}{' '}
                                for search '
                                {// REPLACE WITH SOMETHING PRETTIER PLEASE
                                `/recipeAPI/recipes/complexRecipe/?query=${
                                  this.state.desiredMeal
                                }` +
                                  `&cuisine=${this.state.cuisine.join('%2C+')}` +
                                  `&diet=${this.state.currUser.dietary_restrictions.join('%2C+')}` +
                                  `&includeIngredients=${this.state.includeAdditionalIngredients.join(
                                    '%2C+'
                                  )}` +
                                  `&excludeIngredients=${this.state.excludeAdditionalIngredients.join(
                                    '%2C+'
                                  )}` +
                                  `&intolerances=${
                                    this.state.filterAllergies
                                      ? this.state.currUser.allergies.join('%2C+')
                                      : ''
                                  }`}
                                '
                              </Modal.Header>
                              <Modal.Content image scrolling>
                                <Image size="medium" src={item.image} wrapped />
                                <Modal.Description>
                                  <Header>{item.title}</Header>
                                  <List celled horizontal items={item.cuisines} />
                                  <List celled horizontal items={item.dishTypes} />
                                  <br />
                                  Prep Time: {item.preparationMinutes}
                                  <br />
                                  Cook Time: {item.cookingMinutes}
                                  <br />
                                  Servings: {item.servings}
                                  <br />
                                  Calories: {item.calories}
                                  <br />
                                  Protein: {item.protein}
                                  <br />
                                  Fat: {item.fat}
                                  <br />
                                  Carbs: {item.carbs}
                                  <br />
                                  <List.Header>Cooking Instructions</List.Header>
                                  <List
                                    ordered
                                    items={
                                      !item.analyzedInstructions ||
                                      !item.analyzedInstructions.length
                                        ? ['no recipe instructions']
                                        : item.analyzedInstructions[0].steps.map(step => step.step)
                                    }
                                  />
                                </Modal.Description>
                              </Modal.Content>
                            </Modal>
                          </Card.Content>
                        </Card>
                      ))}
                </Card.Group>
              </Segment>
            </Grid.Column>
          )}
        </Grid>
        <br />
      </div>
    );
  }
}

export default RecipeResults;
