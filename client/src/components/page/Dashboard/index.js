import React, { Component } from 'react';
import axios from 'axios';
import {
  Divider,
  Form,
  Grid,
  Header,
  List,
  Checkbox,
  Dropdown,
  Segment,
  Button,
  Image,
  Modal,
  Item
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
  handleItemDelete(item, db_field_name) {
    console.log(
      'Sending delete request, for item',
      item,
      'from array field in db',
      item,
      db_field_name
    );

    var delete_command = {
      [db_field_name]: item
    };

    //Don't wait for DB to update, just update state and thus the UI right away
    this.state.currUser[db_field_name] = this.state.currUser[db_field_name].filter(function(
      value,
      index,
      arr
    ) {
      return value != item;
    });

    this.setState(this.state);
    axios.post(`/api/users/${this.state.currUser.id}/deleteFromArray`, delete_command).then(res => {
      console.log('Deleted', item, 'from DATABASE');
    });
  }

  //s TO DO: Function to move item from pantry to grocery list
  handleMove() {
    console.log('B Click!');
  }

  //For blurring the popup background
  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    // For blurring the popup background
    const { open, dimmer } = this.state;
    // Mapping pantry items to format into components
    const pantryItems =
      !this.state.currUser.pantry || !this.state.currUser.pantry.length
        ? ['Pantry is empty']
        : this.state.currUser.pantry.map(item => (
            <PantryItem
              db_field_name="pantry"
              item={item}
              onIconClick={this.handleItemDelete.bind(this)}
            />
          ));

    // Mapping dietary restrictions to format into components
    const dietaryItems =
      !this.state.currUser.dietary_restrictions || !this.state.currUser.dietary_restrictions.length
        ? ['no dietary restrictions']
        : this.state.currUser.dietary_restrictions.map(item => (
            <AllergyItem
              db_field_name="dietary_restrictions"
              item={item}
              onIconClick={this.handleItemDelete.bind(this)}
            />
          ));

    // Mapping allergy items to format into components
    const allergyItems =
      !this.state.currUser.allergies || !this.state.currUser.allergies.length
        ? ['no allergies']
        : this.state.currUser.allergies.map(item => (
            <AllergyItem
              db_field_name="allergies"
              item={item}
              onIconClick={this.handleItemDelete.bind(this)}
            />
          ));

    return (
      <div style={{ padding: '0px 30px', paddingBottom: '20px' }}>
        <br />
        {/* HELLO HEADER */}
        <Header as="h1" textAlign="center">
          Hello,{' '}
          {this.state.currUser.full_name
            ? this.state.currUser.full_name
            : this.state.currUser.full_name}
          <sup onClick={this.show('blurring')}>edit</sup>
        </Header>
        {/*Popup to edit user info*/}
        <Modal dimmer={dimmer} open={open} onClose={this.close} centered={true}>
          <Modal.Content scrolling>
            <Header as="h2" textAlign="center">
              Make Changes to User Information
            </Header>
            <Modal.Description>
              <p>
                <Header as="h3">Current Name: </Header> {this.state.currUser.full_name}
              </p>
              <p>
                <Header as="h3">Current Email:</Header> {this.state.currUser.email}
              </p>
              <Divider />
              <Form>
                <Form.Field>
                  <label>New Name</label>
                  <input placeholder="Name" />
                </Form.Field>
                <Form.Field>
                  <label>New Email</label>
                  <input placeholder="Email" />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
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
                  <List items={pantryItems} />
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column floated="left">
              {/* OTHER INFO */}
              <Segment attached="top" textAlign="center" color="green">
                <Header as="h1">User Information</Header>
              </Segment>
              <Segment attached="bottom">
                <p>
                  <Header as="h5">Name: </Header> {this.state.currUser.full_name}
                  <Header as="h5">Email: </Header> {this.state.currUser.email}
                  <Header as="h5">Meals a Day: </Header> {this.state.currUser.mealCount}
                  <Header as="h5">Plan Type: </Header> {this.state.currUser.planType}
                  {/*<Header as="h5">Plan Size: </Header>*/}
                  {/*<Header as="h5">Dietary Preferences: </Header>*/}
                  {/*<Header as="h5">Daily Calorie Intake: </Header>*/}
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column>
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
                <List items={dietaryItems} />
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
                <List items={allergyItems} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
        <br />
      </div>
    );
  }
}

export default Dashboard;
