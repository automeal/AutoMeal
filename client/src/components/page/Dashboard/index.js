import React, { Component } from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';
import SearchBox from '../../shared/Search';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: {},
      pantry: '',
      allergies: '',
      dietary_restrictions: '',
      fieldsToUpdate: {}
    };
  }

  componentWillMount() {
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
    this.setState({
      [prop]: result.name,
      [this.state.currUser[prop]]: [...this.state.currUser[prop], result.name]
    });
    console.log(`curr list: ${this.state.currUser}`);
    this.handleSubmit({ target: [{ name: prop, value: result.name }] });
  };

  handleSubmit = async event => {
    const list = event.target[0].name;
    const newItem = event.target[0].value;
    console.log(`currUser: ${this.state.currUser}`);
    console.log(`list: ${list}, newItem: ${newItem}`);
    // If pantry item already present do not add again
    if (this.state.currUser[list].includes(newItem)) {
      console.log('Item already present');
      return;
    }
    console.log(`Hello, field: ${this.state.currUser[list]}, this.state[newItem]: ${newItem}`);
    axios.patch(`/api/users/${this.state.currUser.id}`, {
      [list]: [...this.state.currUser[list], newItem]
    });
  };

  render() {
    return (
      <div>
        Hello{' '}
        {this.state.currUser.display_name
          ? this.state.currUser.display_name
          : this.state.currUser.full_name}
        <a href="/home-page#/">
          <sup>edit</sup>
        </a>
        <br />
        <br />
        <div style={{ display: 'inline-block' }} className="pantry">
          <List.Header>Your Pantry</List.Header>
          <List
            items={
              !this.state.currUser.pantry || !this.state.currUser.pantry.length
                ? ['Pantry is empty']
                : this.state.currUser.pantry
            }
          />
          <SearchBox
            route="ingredientSearch"
            onChange={this.handleChange.bind(this)}
            handleResult={this.handleResultSelect.bind(this)}
            placeholder="Add new item to pantry"
            value={this.state.pantry}
            name="pantry"
          />
        </div>
        <div style={{ display: 'inline-block' }} className="dietary_restrictions">
          <List.Header>Your Dietary Restrictions</List.Header>
          <List
            items={
              !this.state.currUser.dietary_restrictions ||
              !this.state.currUser.dietary_restrictions.length
                ? ['no dietary restrictions']
                : this.state.currUser.dietary_restrictions
            }
          />
          <SearchBox
            route="ingredientSearch"
            placeholder="Add new item to dietary restrictions"
            value={this.state.dietary_restrictions}
            name="dietary_restrictions"
            onChange={this.handleChange.bind(this)}
            handleResult={this.handleResultSelect.bind(this)}
          />
        </div>
        <div style={{ display: 'inline-block' }} className="allergies">
          <List.Header>Your Allergies</List.Header>
          <List
            items={
              !this.state.currUser.allergies || !this.state.currUser.allergies.length
                ? ['no allergies']
                : this.state.currUser.allergies
            }
          />
          <SearchBox
            route="ingredientSearch"
            handleResult={this.handleResultSelect.bind(this)}
            placeholder="Add new item to allergies"
            value={this.state.allergies}
            name="allergies"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        {/* Generate recipe
          Checkboxes: "Must have pantry items", "Filter out dietary restrictions", "Filter out allergies"
          allow them to disable certain items for the current search
          warn when disabling anything allergy related
         */}
      </div>
    );
  }
}

export default Dashboard;
