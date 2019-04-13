import React, { Component } from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';

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

  handleSubmit = async event => {
    const { list, newItem } = event.target[0];
    console.log(`currUser: ${this.state.currUser}`);
    console.log(`list: ${list}, newItem: ${newItem}`);
    event.preventDefault();
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
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              placeholder="Add new item to pantry"
              value={this.state.pantry}
              name="pantry"
              onChange={this.handleChange.bind(this)}
            />
            <input type="submit" />
          </form>
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
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              placeholder="Add new item to dietary restrictions"
              value={this.state.dietary_restrictions}
              name="dietary_restrictions"
              onChange={this.handleChange.bind(this)}
              style={{ width: '191px' }}
            />
            <input type="submit" />
          </form>
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
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              placeholder="Add new item to allergies"
              value={this.state.allergies}
              name="allergies"
              onChange={this.handleChange.bind(this)}
              style={{ width: '135px' }}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Dashboard;
