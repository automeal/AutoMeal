// import Nav from '../../shared/Nav';
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Header, Button, Icon, Loader, Dimmer } from 'semantic-ui-react';
import food5 from '../../../Resources/food5.jpg';

class MealPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: {},
      pantry: '',
      allergies: '',
      dietary_restrictions: '',

      open: false,
      loader: false
    };
  }
  componentDidMount() {
    axios
      .get('/api/users/current', { Authorization: localStorage.getItem('jwtToken') })
      .then(user => {
        this.setState({ currUser: user.data });
      });
  }
  generateMealPlan = () => {
    var intolerance_string = '';
    if (this.state.filterAllergies)
      intolerance_string += '&intolerances=' + this.state.currUser.allergies.join('%2C+');
    var exclude_string = '';
    if (this.state.excludeAdditionalIngredients)
      exclude_string +=
        '&excludeIngredients=' + this.state.excludeAdditionalIngredients.join('%2C+');

    console.log(this.state.currUser);
    var params_obj = {
      intolerances: this.state.currUser.allergies,
      excludeIngredients: this.state.excludeAdditionalIngredients,
      diet: this.state.currUser.dietary_restrictions,
      cuisine: this.state.cuisine,
      includeIngredients: this.state.currUser.pantry,
      minCalories: 100, //1800 too low for responses //this.state.currUser.mealPlans[0].calories.min,
      maxCalories: this.state.currUser.calories.max
    };
    console.log('PARAMS OBJ', params_obj);

    var params_string = '';
    for (var param in params_obj) {
      console.log(param);
      if (params_obj[param] && params_obj[param].constructor === Array) {
        //if ( params_obj[param].length > 0)
        params_string += '&' + param + '=' + params_obj[param].join('%2C');
      } else if (params_obj[param]) {
        params_string += '&' + param + '=' + params_obj[param];
      }
    }
    params_string = '?' + params_string.slice(1, params_string.length);

    //console.log("/recipeAPI/recipes/generateMealPlan/" + params_string);
    //return;
    var options = {
      mealCount: this.state.currUser.mealCount,
      _id: this.state.currUser.id,
      planType: this.state.currUser.planType,
      calories: this.state.currUser.calories
    };
    this.setState({ loader: true });
    axios
      .post('/recipeAPI/recipes/generateMealPlan/' + params_string, options)
      .then(res => {
        var data = res.data;

        this.state.currUser.mealPlans = data['mealPlans'];
        this.setState(this.state);

        //console.log('Success, latest meal plan:', data['mealPlans'][data['mealPlans'].length - 1]);
        if (this.state.currUser.planType === 7) {
          this.props.history.push('/weekly_mealplan');
        } else this.props.history.push('/daily_mealplan');
      })
      .catch(err => console.log(err));
  };
  render() {
    const weekly = this.state.currUser.planType === 7 ? true : false;
    const meal_empty =
      this.state.currUser.mealPlans === undefined || this.state.currUser.mealPlans.length < 1;

    const weekly_mealplan = (
      <div className="ui fluid image">
        <img src={food5} alt="" />
        <div
          style={{
            position: 'absolute',
            bottom: '40%',
            width: '100%',
            height: 'auto'
          }}
        >
          <Container text textAlign="center">
            <Header
              as="h1"
              content="Your Meal Plan"
              style={{
                fontWeight: 'normal',
                marginBottom: 0
              }}
            />

            <Button
              Button
              color="red"
              size="huge"
              loading={this.state.loader}
              disabled={this.state.loader}
              animated
              onClick={this.generateMealPlan.bind(this)}
            >
              <Button.Content visible>Generate Meal Plan</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>

            <Button
              href="/weekly_mealplan"
              color="green"
              size="huge"
              disabled={meal_empty || this.state.loader}
              animated
            >
              <Button.Content visible>Weekly Meal Plan</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Container>
        </div>
      </div>
    );
    const daily_mealplan = (
      <div className="ui fluid image">
        <img src={food5} alt="" />
        <div
          style={{
            position: 'absolute',
            bottom: '40%',
            width: '100%',
            height: 'auto'
          }}
        >
          <Container text textAlign="center">
            <Header
              as="h1"
              content="Your Meal Plan"
              style={{
                fontWeight: 'normal',
                marginBottom: 0
              }}
            />
            <Button
              Button
              color="red"
              size="huge"
              animated
              loading={this.state.loader}
              disabled={this.state.loader}
              onClick={this.generateMealPlan.bind(this)}
            >
              <Button.Content visible>Generate Meal Plan</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>

            <Button
              href="/daily_mealplan"
              color="green"
              size="huge"
              disabled={meal_empty || this.state.loader}
              animated
            >
              <Button.Content visible>Daily Meal Plan</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Container>
        </div>
      </div>
    );
    return <div className="ui fluid image">{weekly ? weekly_mealplan : daily_mealplan}</div>;
  }
}
export default MealPlan;
