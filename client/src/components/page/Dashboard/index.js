import React, { Component } from 'react';
import axios from 'axios';
import {
  Grid,
  Header,
  List,
  Checkbox,
  Dropdown,
  Segment,
  Button,
  Image,
  Modal,
  Icon
} from 'semantic-ui-react';
import SearchBox from '../../shared/Search';
import PantryItem from './PantryItem';
import AllergyItem from './AllergyItem';

class Dashboard extends Component {
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
      recipeSearchResults: []
    };
    this.handleDelete = this.handleMove.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/users/current', { Authorization: localStorage.getItem('jwtToken') })
      .then(user => {
        this.setState({ currUser: user.data });
      });
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleResultSelect = (prop, result) => {
    const list = prop;
    const newItem = result.name;
    if (this.state.currUser[list].includes(newItem)) {
      console.log('Item already present');
      return;
    }
    console.log(`curr list: ${this.state.currUser.dietary_restrictions}`);
    console.log(`currUser: ${this.state.currUser}`);
    console.log(`list: ${list}, newItem: ${newItem}`);

    let user = this.state.currUser;
    let userList = user[list];
    userList = [...userList, newItem];
    user[list] = userList;
    // If pantry item already present do not add again
    axios
      .patch(`/api/users/${this.state.currUser.id}`, {
        [list]: userList
      })
      .then(() => {
        this.setState({
          [list]: '',
          currUser: user
        });
      });
    console.log(`Hello, field: ${this.state.currUser[list]}, this.state[newItem]: ${newItem}`);
  };

  handleCheck = (event, result) => {
    this.setState({ [result.name]: !result.value });
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

  // TO DO: Function to delete item
  handleDelete() {
    console.log('Click!');
  }

  // TO DO: Function to move item from pantry to grocery list
  handleMove() {
    console.log('Click!');
  }

  render() {
    // Mapping pantry items to format into components
    const pantryItems =
      !this.state.currUser.pantry || !this.state.currUser.pantry.length
        ? ['Pantry is empty']
        : this.state.currUser.pantry.map(item => <PantryItem item={item} />);

    // Mapping dietary restrictions to format into components
    const dietaryItems =
      !this.state.currUser.dietary_restrictions || !this.state.currUser.dietary_restrictions.length
        ? ['no dietary restrictions']
        : this.state.currUser.dietary_restrictions.map(item => <AllergyItem item={item} />);

    // Mapping allergy items to format into components
    const allergyItems =
      !this.state.currUser.allergies || !this.state.currUser.allergies.length
        ? ['no allergies']
        : this.state.currUser.allergies.map(item => <AllergyItem item={item} />);

    return (
      <div style={{ padding: '0px 30px', paddingBottom: '20px' }}>
        <br />
        {/* HELLO HEADER */}
        <Header as="h1" textAlign="center">
          Hello,{' '}
          {this.state.currUser.display_name
            ? this.state.currUser.display_name
            : this.state.currUser.full_name}
          <a href="/home-page#/">
            <sup>edit</sup>
          </a>
        </Header>
        <br />
        <br />
        <Grid stackable columns="equal">
          <Grid.Row>
            <Grid.Column floated="left">
              {/*PANTRY COMPONENT*/}
              <Segment attached="top" color="green">
                <Header as="h2" textAlign="center">
                  Your Pantry
                </Header>
              </Segment>
              <Segment attached="bottom">
                <p>
                  {/*Search component for ingredients*/}
                  <SearchBox
                    route="ingredients"
                    onChange={this.handleChange.bind(this)}
                    handleResult={this.handleResultSelect.bind(this)}
                    placeholder="Add new item to pantry"
                    value={this.state.pantry}
                    name="pantry"
                  />
                  {/*Pantry items*/}
                  <List
                    items={
                      !this.state.currUser.pantry || !this.state.currUser.pantry.length
                        ? ['Pantry is empty']
                        : pantryItems
                    }
                  />
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column floated="left">
              {/*DIETARY RESTRICTIOS COMPONENT*/}
              <Segment attached="top" textAlign="center" color="green">
                <Header as="h1">Your Dietary Restrictions</Header>
              </Segment>
              <Segment attached="bottom">
                {/*Search component for dietary restrictions*/}
                <SearchBox
                  route="ingredients"
                  placeholder="Add new item to dietary restrictions"
                  value={this.state.dietary_restrictions}
                  name="dietary_restrictions"
                  onChange={this.handleChange.bind(this)}
                  handleResult={this.handleResultSelect.bind(this)}
                />
                {/*Dietary restrictions*/}
                <List
                  items={
                    !this.state.currUser.dietary_restrictions ||
                    !this.state.currUser.dietary_restrictions.length
                      ? ['no dietary restrictions']
                      : dietaryItems
                  }
                />
              </Segment>
              {/*ALLERGIES COMPONENT*/}
              <Segment attached="top" textAlign="center" color="green">
                <Header as="h1">Your Allergies</Header>
              </Segment>
              <Segment attached="bottom">
                {/*Search component for allergy items*/}
                <SearchBox
                  route="ingredients"
                  handleResult={this.handleResultSelect.bind(this)}
                  placeholder="Add new item to allergies"
                  value={this.state.allergies}
                  name="allergies"
                  onChange={this.handleChange.bind(this)}
                />
                {/*Allergy items*/}
                <List
                  items={
                    !this.state.currUser.allergies || !this.state.currUser.allergies.length
                      ? ['no allergies']
                      : allergyItems
                  }
                />
              </Segment>
            </Grid.Column>
            <Grid.Column floated="left">
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
                <Button onClick={this.getRecipe.bind(this)}>get dat recipe</Button>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <List
                  celled
                  items={
                    !this.state.recipeSearchResults || !this.state.recipeSearchResults.length
                      ? ['East some ice chips']
                      : this.state.recipeSearchResults.map((item, key) => (
                          <Modal
                            trigger={
                              <Button>
                                <Header>{item.title}</Header>
                                <Image src={item.image} small />
                              </Button>
                            }
                          >
                            <Modal.Header>
                              Result {key + 1} of{' '}
                              {!this.state.recipeSearchResults ||
                              !this.state.recipeSearchResults.length
                                ? 0
                                : this.state.recipeSearchResults.length}{' '}
                              for search '
                              {// REPLACE WITH SOMETHING PRETTIER PLEASE
                              `/recipeAPI/recipes/complexRecipe/?query=${this.state.desiredMeal}` +
                                `&cuisine=${this.state.cuisine.join('%2C+')}` +
                                `&diet=${this.state.currUser.dietary_restrictions.join('%2C+')}` +
                                `&includeIngredients=${this.state.includeAdditionalIngredients
                                  // DO NOT concat on call (call at end of this comment block)
                                  // concat on react side and have includeAdditionalIngredients store all ingredients to be included
                                  // this allows users to temporarily exclude items that live in their pantry
                                  // .concat(this.state.currUser.pantry)
                                  .join('%2C+')}` +
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
                                    !item.analyzedInstructions || !item.analyzedInstructions.length
                                      ? ['no recipe instructions']
                                      : item.analyzedInstructions[0].steps.map(step => step.step)
                                  }
                                />
                                <p>
                                  This is an example of expanded content that will cause the modal's
                                  dimmer to scroll
                                </p>
                              </Modal.Description>
                            </Modal.Content>
                          </Modal>
                        ))
                  }
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
