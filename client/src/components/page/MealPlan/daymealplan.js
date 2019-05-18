// import Nav from '../../shared/Nav';
import React from 'react';
import axios from 'axios';
// import './Landing.css';
import { Card, Image, Grid } from 'semantic-ui-react';
import DaySelect from '../../shared/DaySelect';
class Mealplan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: {},
      selectedDay: this.getTodaysDate(),
      meals: {
        breakfast: {
          recipes: []
        },
        lunch: {
          recipes: []
        },
        dinner: {
          recipes: []
        },
        morning_snacks: {
          recipes: []
        },
        afternoon_snacks: {
          recipes: []
        }
      }
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
          <h1>Wednesday meal plan</h1>
        </Grid>
        <Card.Group itemsPerRow={3} raised>
          <Card>
            <Image
              style={{ width: '460px', height: '320px' }}
              src={
                !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                  ? ''
                  : this.state.currUser.mealPlans[0].recipes[0].image
              }
            />
            <Card.Content>
              <Card.Header>Breakfast</Card.Header>
              <Card.Meta>
                {!this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                  ? ''
                  : this.state.currUser.mealPlans[0].recipes[0].title}
              </Card.Meta>
              <Card.Description>
                preparationMinutes:
                {!this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                  ? ''
                  : this.state.currUser.mealPlans[0].recipes[0].preparationMinutes}
                Minutes
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Image
              style={{ width: '460px', height: '320px' }}
              src={
                !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                  ? ''
                  : this.state.currUser.mealPlans[0].recipes[1].image
              }
            />
            <Card.Content>
              <Card.Header>Lunch</Card.Header>
              <Card.Meta>
                {!this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                  ? ''
                  : this.state.currUser.mealPlans[0].recipes[1].title}
              </Card.Meta>
              <Card.Description>
                preparationMinutes:
                {!this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                  ? ''
                  : this.state.currUser.mealPlans[0].recipes[1].preparationMinutes}
                Minutes
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Image
              style={{ width: '460px', height: '320px' }}
              src={
                !this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                  ? ''
                  : this.state.currUser.mealPlans[0].recipes[2].image
              }
            />
            <Card.Content>
              <Card.Header>Dinner</Card.Header>
              <Card.Meta>
                {!this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                  ? ''
                  : this.state.currUser.mealPlans[0].recipes[2].title}
              </Card.Meta>
              <Card.Description>
                preparationMinutes:
                {!this.state.currUser.mealPlans || !this.state.currUser.mealPlans.length
                  ? ''
                  : this.state.currUser.mealPlans[0].recipes[2].preparationMinutes}
                Minutes
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default Mealplan;
