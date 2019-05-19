import React, { Component } from 'react';
import axios from 'axios';
import { Divider, Form, Grid, Header, List, Segment, Icon, Button, Modal, Label, Message } from 'semantic-ui-react';
import Pantry from './Pantry';
import DietaryRestrictions from './DietaryRestrictions';
import Allergies from './Allergies';
import UserInfo from './UserInfo';

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
      // For the popup
      open: false,
      newName: '',
      newEmail: '',
      newPassword: '',
      confirmNewPassword: '',
      successfulUpdate: false,
      updateSent: false
    };
    //this.handleDelete = this.handleMove.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/users/current', { Authorization: localStorage.getItem('jwtToken') })
      .then(user => {
        this.setState({ currUser: user.data });
        console.log(user);
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
    console.log("Cusine" , res);
    this.setState({ cuisine: [...this.state.cuisine, res.value[0]] });
    console.log(this.state.cuisine);
  };

  generateMealPlan(){

    var intolerance_string = '';
    if (this.state.filterAllergies) 
      intolerance_string += "&intolerances=" + this.state.currUser.allergies.join('%2C+')
    var exclude_string = '';
    if (this.state.excludeAdditionalIngredients.length > 0)
      exclude_string += "&excludeIngredients=" + this.state.excludeAdditionalIngredients.join('%2C+')
    
    console.log(this.state.currUser);
    var params_obj = {
      "intolerances" : this.state.currUser.allergies,
      "excludeIngredients" : this.state.excludeAdditionalIngredients,
      "diet" : this.state.currUser.dietary_restrictions,
      "cuisine" : this.state.cuisine,
      "includeIngredients" : this.state.currUser.pantry,
      "minCalories" :   100, //1800 too low for responses //this.state.currUser.mealPlans[0].calories.min,
      "maxCalories" : this.state.currUser.calories.max,
    };
    console.log("PARAMS OBJ", params_obj);

    var params_string = "";
    for(var param in params_obj){
      console.log(param);
      if (params_obj[param] && params_obj[param].constructor === Array){
        //if ( params_obj[param].length > 0) 
          params_string += "&" + param + "=" + params_obj[param].join('%2C');
      }
      else if(params_obj[param]){
        params_string += "&" + param + "=" + params_obj[param];
      }
    }
    params_string = "?" + params_string.slice(1, params_string.length);

    //console.log("/recipeAPI/recipes/generateMealPlan/" + params_string);
    //return;
    var options = {
      "mealCount" : this.state.currUser.mealCount,
      "_id" : this.state.currUser.id,
      "planType" : this.state.currUser.planType,
      "calories" : this.state.currUser.calories
    }

    axios
      .post(
        "/recipeAPI/recipes/generateMealPlan/" + params_string, options
      )
      .then(  (res) => {
        var data = res.data;
        
        this.state.currUser.mealPlans = data["mealPlans"];
        this.setState( this.state );

        console.log("Success, latest meal plan:", data["mealPlans"][data["mealPlans"].length-1] )
        //this.props.history.push('/dashboard');

      })
      .catch(err => console.log(err));

  }

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
  handleItemDelete = (item, db_field_name) => {
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
      return value !== item;
    });

    this.setState(this.state);
    axios.post(`/api/users/${this.state.currUser.id}/deleteFromArray`, delete_command).then(res => {
      console.log('Deleted', item, 'from DATABASE');
    });
  };

  //s TO DO: Function to move item from pantry to grocery list
  handleMove = () => {
    console.log('B Click!');
  };

  contactInfoUpdate = () => {
    const { newName, newEmail, newPassword, confirmNewPassword } = this.state;
    const { currName, currEmail } = this.state.currUser;
    let newData = {};
    if (newName !== currName && newName !== '') newData.full_name = newName;
    if (newEmail !== currEmail && newEmail !== '') newData.email = newEmail;

    if (newData.full_name || newData.email)
      axios.patch(`/api/users/${this.state.currUser.id}`, newData).then(res => {
        this.setState({
          currUser: { ...this.state.currUser, ...newData },
          successfulUpdate: res.data.success,
          updateSent: true
        });
      });

    if (newPassword === confirmNewPassword && newPassword !== '' && confirmNewPassword !== '') {
      newData.password = newPassword;
      axios.patch(`/api/users/${this.state.currUser.id}/changePassword`, newData).then(res => {
        this.setState({
          currUser: { ...this.state.currUser, ...newData },
          successfulUpdate: res.data.success,
          updateSent: true
        });
      });
    } else {
      this.setState({ updateSent: true, successfulUpdate: false });
    }
  };

  //For blurring the popup background
  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false, updateSent: false });

  render() {
    // For blurring the popup background
    const { open, dimmer } = this.state;

    return (
      <div style={{ padding: '0px 30px', paddingBottom: '20px' }}>
        <br />
        {/* HELLO HEADER */}
        <Header as="h1" textAlign="center">
          Hello,{' '}
          {this.state.currUser.full_name
            ? this.state.currUser.full_name
            : this.state.currUser.full_name}{' '}
          <Label basic pointing="left" as="sup" onClick={this.show('blurring')}>
            edit
          </Label>
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
                  <input
                    placeholder="Name"
                    name="newName"
                    value={this.state.newName}
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>New Email</label>
                  <input
                    placeholder="Email"
                    name="newEmail"
                    value={this.state.newEmail}
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Field>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>New Password</label>
                    <Form.Input
                      placeholder="New Password"
                      type="password"
                      name="newPassword"
                      value={this.state.newPassword}
                      onChange={this.handleChange.bind(this)}
                      error={
                        this.state.confirmNewPassword !== this.state.newPassword &&
                        this.state.confirmNewPassword !== ''
                      }
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Confirm New Password</label>
                    <Form.Input
                      placeholder="Confirm New Password"
                      type="password"
                      name="confirmNewPassword"
                      value={this.state.confirmNewPassword}
                      onChange={this.handleChange.bind(this)}
                      error={
                        this.state.confirmNewPassword !== this.state.newPassword &&
                        this.state.newPassword !== ''
                      }
                    />
                  </Form.Field>
                </Form.Group>
                <Button type="submit" onClick={this.contactInfoUpdate.bind(this)}>
                  Submit
                </Button>
                <Message
                  positive={this.state.successfulUpdate}
                  negative={!this.state.successfulUpdate}
                  hidden={!this.state.updateSent}
                  header={this.state.successfulUpdate ? 'Success' : 'Error'}
                  content={
                    this.state.successfulUpdate
                      ? 'Your user information has been updated!'
                      : 'An error occurred, please check your input.'
                  }
                />
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <br />
        <br />
        <Grid stackable columns="equal">
          <Grid.Row>
            <Grid.Column floated="left">
              <Pantry
                handleItemDelete={this.handleItemDelete.bind(this)}
                currUser={this.state.currUser}
                handleChange={this.handleChange.bind(this)}
                handleResultSelect={this.handleResultSelect.bind(this)}
                pantry={this.pantry}
              />
            </Grid.Column>
            <Grid.Column floated="left">
              <UserInfo currUser={this.state.currUser} />
            </Grid.Column>
            <Grid.Column>
              <DietaryRestrictions
                handleItemDelete={this.handleItemDelete.bind(this)}
                currUser={this.state.currUser}
                handleChange={this.handleChange.bind(this)}
                handleResultSelect={this.handleResultSelect.bind(this)}
                dietary_restrictions={this.dietary_restrictions}
              />
              <Allergies
                handleItemDelete={this.handleItemDelete.bind(this)}
                currUser={this.state.currUser}
                handleChange={this.handleChange.bind(this)}
                handleResultSelect={this.handleResultSelect.bind(this)}
                allergies={this.allergies}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* Generate recipe
          Checkboxes: "Must have pantry items", "Filter out dietary restrictions", "Filter out allergies"
          allow them to disable certain items for the current search
          warn when disabling anything allergy related
         */}
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Dashboard;
