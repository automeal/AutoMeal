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
      currUser: {}
    };
  }
  componentWillMount() {
    axios
      .get('/api/users/current', { Authorization: localStorage.getItem('jwtToken') })
      .then(user => {
        this.setState({ currUser: user.data });
        // this.state.currUser.mealPlans[0].recipes[0].title
        console.log(`user data`);
        console.log(this.state.currUser);
      });
  }

  render() {
    return (
      <div className="DayView content-container">
        <h1>AutoMeal Daily Meal Plan</h1>

        <Grid columns="equal" verticalAlign="middle" textAlign="center" divided stretched stackable>
          <RecipeResults
            header="Recipe Results"
            itemsPerRow={3}
            recipeSearchResults={
              !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                ? ''
                : this.state.currUser.mealPlans[this.state.currUser.mealPlans.length - 1].days[0]
                    .recipes
            }
          />
        </Grid>
      </div>
    );
  }
}

export default Mealplan;
