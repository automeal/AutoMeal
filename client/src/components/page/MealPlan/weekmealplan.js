// import Nav from '../../shared/Nav';
import React from 'react';
// import './Landing.css';
import { Grid, Tab, Header } from 'semantic-ui-react';
import axios from 'axios';
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
        console.log(`hello`);
        console.log(this.state.currUser);
      });
  }

  render() {
    const panes = [
      {
        menuItem: 'Monday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <RecipeResults
                itemsPerRow={3}
                header="Recipe Results"
                recipeSearchResults={
                  !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                    ? ''
                    : this.state.currUser.mealPlans[this.state.currUser.mealPlans.length - 1]
                        .days[0].recipes
                }
              />
            </Grid>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Tuesday',

        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <RecipeResults
                itemsPerRow={3}
                header="Recipe Results"
                recipeSearchResults={
                  !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                    ? ''
                    : this.state.currUser.mealPlans[this.state.currUser.mealPlans.length - 1]
                        .days[1].recipes
                }
              />
            </Grid>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Wednesday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <RecipeResults
                itemsPerRow={3}
                header="Recipe Results"
                recipeSearchResults={
                  !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                    ? ''
                    : this.state.currUser.mealPlans[this.state.currUser.mealPlans.length - 1]
                        .days[2].recipes
                }
              />
            </Grid>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Thursday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <RecipeResults
                itemsPerRow={3}
                header="Recipe Results"
                recipeSearchResults={
                  !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                    ? ''
                    : this.state.currUser.mealPlans[this.state.currUser.mealPlans.length - 1]
                        .days[3].recipes
                }
              />
            </Grid>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Friday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <RecipeResults
                itemsPerRow={3}
                header="Recipe Results"
                recipeSearchResults={
                  !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                    ? ''
                    : this.state.currUser.mealPlans[this.state.currUser.mealPlans.length - 1]
                        .days[4].recipes
                }
              />
            </Grid>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Saturday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <RecipeResults
                itemsPerRow={3}
                header="Recipe Results"
                recipeSearchResults={
                  !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                    ? ''
                    : this.state.currUser.mealPlans[this.state.currUser.mealPlans.length - 1]
                        .days[5].recipes
                }
              />
            </Grid>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Sunday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <RecipeResults
                itemsPerRow={3}
                header="Recipe Results"
                recipeSearchResults={
                  !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                    ? ''
                    : this.state.currUser.mealPlans[this.state.currUser.mealPlans.length - 1]
                        .days[6].recipes
                }
              />
            </Grid>
          </Tab.Pane>
        )
      }
    ];
    return <Tab panes={panes} />;
  }
}

export default Mealplan;
