import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Header,
  Icon,
  Label,
  List,
  Checkbox,
  Dropdown,
  Segment
} from 'semantic-ui-react';
import SearchBox from '../../shared/Search';

import PantryItem from './PantryItem';
import AllergyItem from './AllergyItem';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: {},
      pantry: '',
      allergies: '',
      dietaryRestrictions: '',
      cuisine: [],
      includePantry: true,
      filterDietaryRestrictions: true,
      filterAlergies: true
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
    console.log(`curr list: ${this.state.currUser.dietaryRestrictions}`);
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

  handleCheck = event => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: !this.state[event.target.name] });
  };

  handleDelete() {
    console.log('Click!');
  }

  handleMove() {
    console.log('Click!');
  }

  render() {
    // Mapping pantry items to format into components
    const pantryItems =
      !this.state.currUser.pantry || !this.state.currUser.pantry.length
        ? ['Pantry is empty']
        : this.state.currUser.pantry.map(item => <PantryItem item={item} />);

    return (
      <div>
        <br />
        <Header as="h1" textAlign="center">
          Hello,{' '}
          {this.state.currUser.display_name
            ? this.state.currUser.display_name
            : this.state.currUser.fullName}
          <a href="/home-page#/">
            <sup>edit</sup>
          </a>
        </Header>
        <br />
        <br />
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column floated="left">
              <Segment attached="top" color="green">
                <Header as="h2" textAlign="center">
                  Your Pantry
                </Header>
              </Segment>
              <Segment attached="bottom">
                <p>
                  <SearchBox
                    route="ingredients"
                    onChange={this.handleChange.bind(this)}
                    handleResult={this.handleResultSelect.bind(this)}
                    placeholder="Add new item to pantry"
                    value={this.state.pantry}
                    name="pantry"
                  />
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
              <Segment attached="top" textAlign="center" color="green">
                <Header as="h1">Your Dietary Restrictions</Header>
              </Segment>
              <Segment attached="bottom">
                <List
                  items={
                    !this.state.currUser.dietaryRestrictions ||
                    !this.state.currUser.dietaryRestrictions.length
                      ? ['no dietary restrictions']
                      : this.state.currUser.dietaryRestrictions
                  }
                />
                <SearchBox
                  route="ingredients"
                  placeholder="Add new item to dietary restrictions"
                  value={this.state.dietaryRestrictions}
                  name="dietaryRestrictions"
                  onChange={this.handleChange.bind(this)}
                  handleResult={this.handleResultSelect.bind(this)}
                />
              </Segment>
              <Segment attached="top" textAlign="center" color="green">
                <Header as="h1">Your Allergies</Header>
              </Segment>
              <Segment attached="bottom">
                <AllergyItem item="milk" />
                <List
                  items={
                    !this.state.currUser.allergies || !this.state.currUser.allergies.length
                      ? ['no allergies']
                      : this.state.currUser.allergies
                  }
                />
                <SearchBox
                  route="ingredients"
                  handleResult={this.handleResultSelect.bind(this)}
                  placeholder="Add new item to allergies"
                  value={this.state.allergies}
                  name="allergies"
                  onChange={this.handleChange.bind(this)}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column floated="left">
              <Segment attached="top" textAlign="center" color="green">
                <Header as="h1">Complex Recipe Search</Header>
              </Segment>
              <Segment attached="bottom">
                <Checkbox
                  name="includePantry"
                  // value={this.state.includePantry}
                  // checked={this.state.includePantry}
                  // onClick={this.handleCheck.bind(this)}
                  toggle
                  label="Include pantry"
                />
                <br />
                <Checkbox
                  name="filterDietaryRestrictions"
                  // value={this.state.filterDietaryRestrictions}
                  // checked={this.state.filterDietaryRestrictions}
                  // onClick={this.handleCheck.bind(this)}
                  toggle
                  label="Filter out recipes that include dietary restrictions"
                />
                <br />
                <Checkbox
                  name="filterAlergies"
                  // value={this.state.filterAlergies}
                  // checked={this.state.filterAlergies}
                  // onClick={this.handleCheck.bind(this)}
                  toggle
                  label="Filter out recipes that include allergies"
                />
                <br />
                <br />
                Additional Items to Use:
                <br />
                <SearchBox
                  route="ingredients"
                  handleResult={this.handleResultSelect.bind(this)}
                  placeholder="Add new item to allergies"
                  value={this.state.allergies}
                  name="allergies"
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                Additional Items to Exclude:
                <br />
                <SearchBox
                  route="ingredients"
                  handleResult={this.handleResultSelect.bind(this)}
                  placeholder="Add new item to allergies"
                  value={this.state.allergies}
                  name="allergies"
                  onChange={this.handleChange.bind(this)}
                />
                <br />
                <Dropdown
                  onChange={this.state.handleCuisineChange}
                  value={this.state.cuisine}
                  name="cuisine"
                  placeholder="Cuisine"
                  multiple
                  search
                  selection
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
                />
              </Segment>
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
        <div route={'s'} number={'s'} ranking={'s'} ignorePantry={'s'} ingredients={'s'} />
      </div>
    );
  }
}

export default Dashboard;
