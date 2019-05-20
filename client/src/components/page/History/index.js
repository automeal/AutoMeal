import React from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import RecipeResults from '../../shared/RecipeResults';

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

  consolidateMealPlan(mealPlan) {
    var recipes = [];

    if (mealPlan.planType === 7) {
      console.log('weekly');
      for (var i = 0; i < mealPlan.days.length; i++) {
        var day = mealPlan.days[i];
        recipes = recipes.concat(day.recipes);
      }
    } else {
      console.log('daily');
      recipes = recipes.concat(mealPlan.days[0].recipes);
    }
    console.log('recipe');
    console.log(recipes);
    return recipes;
  }

  render() {
    return (
      <div className="DayView content-container">
        <Grid columns="equal" verticalAlign="middle" textAlign="center" divided stretched stackable>
          {!this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
            ? ''
            : this.state.currUser.mealPlans.map((mealPlan, key) => (
                <RecipeResults
                  header={`Week ${key + 1}`}
                  itemsPerRow={3}
                  recipeSearchResults={this.consolidateMealPlan(mealPlan)}
                />
              ))}
        </Grid>
      </div>
    );
  }
}

export default History;
