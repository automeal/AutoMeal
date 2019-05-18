// import Nav from '../../shared/Nav';
import React from 'react';
import axios from 'axios';
// import './Landing.css';
import { Grid } from 'semantic-ui-react';
import DaySelect from '../../shared/DaySelect';
import RecipeResults from '../../shared/RecipeResults';

class Mealplan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: {},
      selectedDay: this.getTodaysDate()
    };
  }
  componentWillMount() {
    axios
      .get('/api/users/current', { Authorization: localStorage.getItem('jwtToken') })
      .then(user => {
        this.setState({ currUser: user.data });
        // this.state.currUser.mealPlans[0].recipes[0].title
        console.log(`hello`);
        console.log(this.state.currUser);
      });
  }

  getTodaysDate() {
    return new Date(Date.now() - 60000 * new Date().getTimezoneOffset());
  }
  changeSelectedDay(newDay) {
    this.setState({ selectedDay: newDay }, () => {});
  }
  render() {
    return (
      <div className="DayView content-container">
        <h1>AutoMeal Calendar</h1>
        <DaySelect
          selectedDay={this.state.selectedDay}
          changeSelectedDay={this.changeSelectedDay.bind(this)}
          day={this.state.selectedDay}
        />

        <Grid columns="equal" verticalAlign="middle" textAlign="center" divided stretched stackable>
          <RecipeResults
            recipeSearchResults={
              !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                ? ''
                : this.state.currUser.mealPlans[1].recipes
            }
          />
        </Grid>
      </div>
    );
  }
}

export default Mealplan;
