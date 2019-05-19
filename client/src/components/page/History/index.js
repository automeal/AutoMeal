import React from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import Recipe from '../../shared/MealPlan';

class History extends React.Component {
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
        <Grid columns="equal" verticalAlign="middle" textAlign="center" divided stretched stackable>
          <Recipe
            recipeSearchResults={
              !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                ? ''
                : this.state.currUser.mealPlans.map((item, key) => item.recipes)
            }
          />
        </Grid>
      </div>
    );
  }
}

export default History;
