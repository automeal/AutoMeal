// import Nav from '../../shared/Nav';
import React from 'react';
// import './Landing.css';
import { Card, Image, Grid } from 'semantic-ui-react';
import DaySelect from '../../shared/DaySelect';
import ex3 from '../../../Resources/ex3.jpeg';
import ex6 from '../../../Resources/ex6.jpg';
import ex4 from '../../../Resources/ex4.jpg';

class Mealplan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
            <Image style={{ width: '460px', height: '320px' }} src={ex3} />
            <Card.Content>
              <Card.Header>Breakfast</Card.Header>
              <Card.Meta>Sushi</Card.Meta>
              <Card.Description>make time:</Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Image style={{ width: '460px', height: '320px' }} src={ex6} />
            <Card.Content>
              <Card.Header>Lunch</Card.Header>
              <Card.Meta>Sushi</Card.Meta>
              <Card.Description>make time:</Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Image style={{ width: '460px', height: '320px' }} src={ex4} />
            <Card.Content>
              <Card.Header>Dinner</Card.Header>
              <Card.Meta>Sushi</Card.Meta>
              <Card.Description>make time:</Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default Mealplan;
