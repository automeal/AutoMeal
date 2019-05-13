import React, { Component } from 'react';
//import { Redirect } from 'react-router'
//import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import Select from '../../shared/Form/Select';
import { CheckboxGroup } from '../../shared/Form/Checkbox';
import RadioGroup, { Radio } from '../../shared/Form/Radio';
import Button from '../../shared/Button';
import Tabs, { Tab } from '../../shared/Tabs';

//api related
import getPlan from '../../../utils/mealPlan';
import { getSurveyData } from '../../../utils/data';

import './Survey.css';
import axios from 'axios';

class Survey extends Component {
  //Try redirecting with the router? 's history object to avoid errors when using it in .then() in axios calls in this component
  //Same error
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    axios
      .get('/api/users/current', { Authorization: localStorage.getItem('jwtToken') })
      .then(user => {
        this.setState({ currUser: user.data });
        console.log('survey component', this.state.currUser);
      });

    this.data = getSurveyData();
    const count = this.data.selectOpt.mealCount[0].val;
    const plan = this.data.selectOpt.planType[0].val;
    const defaultDiet = {
      activeIndex: 0,
      name: this.data.dietSpec[0].name
    };
    const calories = {
      activeIndex: 0,
      selected: 'rec',
      min: this.data.calories.min,
      max: this.data.calories.max
    };
    this.setState({
      mealCount: count,
      planType: plan,
      healthPreferences: {},
      intolerances: {},
      calories: calories,
      diet: defaultDiet,
      loading: false,
      redirect: false
    });
  }

  handleHealth = name => {
    this.setState(prevState => {
      let value = prevState.healthPreferences[name] ? !prevState.healthPreferences[name] : true;
      return {
        healthPreferences: { ...prevState.healthPreferences, [name]: value }
      };
    });
  };

  handleIntolerances = name => {
    this.setState(prevState => {
      let value = prevState.intolerances[name] ? !prevState.intolerances[name] : true;
      return { intolerances: { ...prevState.intolerances, [name]: value } };
    });
  };

  handleSelect = e => {
    const target = e.target;
    this.setState({ [target.name]: parseInt(target.value, 10) });
  };

  handleCalories = index => {
    let selected = parseInt(index, 10) === 1 ? 'custom' : 'rec';
    this.setState({
      calories: {
        ...this.state.calories,
        activeIndex: index,
        selected: selected
      }
    });
  };

  setCalories = e => {
    const target = e.target;
    if (target.value) {
      let value = parseInt(target.value, 10);
      if (isNaN(value)) {
        value = 0;
      }
      this.setState({
        calories: { ...this.state.calories, [target.name]: value }
      });
    }
  };

  handleDiet = index => {
    const name = this.data.dietSpec[index].name;
    this.setState({
      diet: { activeIndex: index, name: name }
    });
  };

  goTo = e => {
    e.preventDefault();
    const Tabs = this.tabs;
    switch (e.target.name) {
      case 'next':
        Tabs.handleClick(Tabs.state.activeIndex + 1);
        break;
      case 'back':
        Tabs.handleClick(Tabs.state.activeIndex - 1);
        break;
      default:
        break;
    }
  };

  getMealPlan = e => {
    e.preventDefault();
    const { mealCount, planType, healthPreferences, calories, diet, personCount } = this.state;
    // const dietPreference = this.data.dietSpec[diet.activeIndex].name;
    const meals = this.data.mealTypes[mealCount];
    const person = this.data.personType[personCount];
    const res = {
      plan: planType,
      health: healthPreferences,
      calories: { min: calories.min, max: calories.max },
      diet: diet.name,
      meals: meals,
      person: person
    };
    this.setState({ loading: true }, () => {
      getPlan(res).then(data => {
        let par = { num: this.state.planType, data: data };
        //stop loading and redirect to meal page
        this.setState({ loading: false, redirect: true, data: par });
      });
    });
  };

  /*
  History object should be called *after* the axios call to patch the DB, but 
  doing that causes errors such as 

  Proxy error: Could not proxy request /api/users/abc123456879xyz from localhost:3000 to http://localhost:5000.
  See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNRESET).

  As it is now, sometimes you will not see updates to the DB when redirected to the dashboard, even though they do happen
  Depends if the axios call patches the DB before the client finishes redirecting to the dashboard
  */
  BackendCall = e => {
    const {
      mealCount,
      planType,
      healthPreferences,
      intolerances,
      calories,
      personCount
    } = this.state;
    const { activeIndex } = this.state.diet;

    var dietary_restrictions = [];
    for (var prop in healthPreferences) {
      if (healthPreferences.hasOwnProperty(prop)) {
        dietary_restrictions.push(prop);
      }
    }

    var allergies = [];
    for (var prop in intolerances) {
      if (intolerances.hasOwnProperty(prop)) {
        allergies.push(prop);
      }
    }

    var updateObj = {
      dietary_restrictions: dietary_restrictions,
      allergies: allergies,
      mealPlans: [
        {
          planType: planType,
          calories: calories,
          //'personCount':personCount,
          mealCount: mealCount
        }
      ]
    };

    console.log('FROM SURVEY', updateObj);
    // PATCH THE DATA

    /*
    fetch(`/api/users/${this.state.currUser.id}`, {
      _method: 'PATCH',
    }).then( () => {this.props.history.push('/dashboard');} )
    */

    axios
      .patch(`/api/users/${this.state.currUser.id}`, updateObj)
      .then(res => {
        //this.props.history.push('/dashboard');
        //this.props.history.replace('/dashboard');
        //this.context.router.history.push(`/dashboard`);
        //setTimeout( () => {this.props.history.push(`/dashboard`)}, 1000);
        //this.context.history.push('/dashboard')
        //this.context.history.replace('/dashboard')
        console.log(`Sucessfullly patched from survey!`);
      })
      .catch(err => {
        console.log('err?', err.response);
      });

    this.props.history.push('/dashboard');
  };

  render() {
    const { selectOpt, dietSpec, healthSpec, intoleranceSpec } = this.data;
    return (
      <div className="Survey">
        {this.state.loading ? (
          <div className="Survey__loading">
            <h1 className="Survey__loading__heading">Chopping those onions</h1>
            <i className="fa fa-spinner Survey__loading__icon" aria-hidden="true" />
          </div>
        ) : (
          <div className="Survey__content">
            <div className="Survey__heading">
              <h1>Some quick questions to generate that awesome meal plan ..</h1>
            </div>
            <form>
              <Tabs
                defaultIndex={0}
                ref={component => {
                  this.tabs = component;
                }}
                className="Survey__tabs"
              >
                <Tab heading="1">
                  <h2>How many meals do you ( or want to have ) in a day?</h2>
                  <Select
                    name="mealCount"
                    value={this.state.mealCount}
                    handler={this.handleSelect}
                    options={selectOpt.mealCount}
                  />
                  <div className="Survey__goto">
                    <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">
                      Next
                    </Button>
                  </div>
                </Tab>

                <Tab heading="2">
                  <h2>Choose a plan type</h2>
                  <Select
                    name="planType"
                    value={this.state.planType}
                    handler={this.handleSelect}
                    options={selectOpt.planType}
                  />
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">
                      Back
                    </Button>
                    <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">
                      Next
                    </Button>
                  </div>
                </Tab>

                <Tab heading="3">
                  <h2>Any dietary preferences?</h2>
                  <RadioGroup
                    handleChange={this.handleDiet}
                    activeIndex={this.state.diet.activeIndex}
                  >
                    {dietSpec.map(diet => (
                      <Radio key={diet.name}>{diet.text}</Radio>
                    ))}
                  </RadioGroup>
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">
                      Back
                    </Button>
                    <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">
                      Next
                    </Button>
                  </div>
                </Tab>

                <Tab heading="4">
                  <h2>Any health preferences?</h2>
                  <CheckboxGroup
                    data={healthSpec}
                    toggleHandler={this.handleHealth}
                    isCheckedState={this.state.healthPreferences}
                  />
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">
                      Back
                    </Button>
                    <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">
                      Next
                    </Button>
                  </div>
                </Tab>
                <Tab heading="5">
                  <h2>Intolerances?</h2>
                  <CheckboxGroup
                    data={intoleranceSpec}
                    toggleHandler={this.handleIntolerances}
                    isCheckedState={this.state.intolerances}
                  />
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">
                      Back
                    </Button>
                    <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">
                      Next
                    </Button>
                  </div>
                </Tab>
                <Tab heading="6">
                  <h2>Calorie intake</h2>
                  <RadioGroup
                    handleChange={this.handleCalories}
                    activeIndex={this.state.calories.activeIndex}
                  >
                    <Radio>Go with recommended</Radio>
                    <Radio>Choose custom values</Radio>
                  </RadioGroup>
                  {this.state.calories.selected === 'custom' ? (
                    <div className="Survey__input--custom">
                      <input
                        placeholder="min"
                        type="number"
                        name="min"
                        onChange={this.setCalories}
                        value={this.state.calories.min}
                      />
                      <input
                        placeholder="max"
                        type="number"
                        name="max"
                        onChange={this.setCalories}
                        value={this.state.calories.max}
                      />
                    </div>
                  ) : null}
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">
                      Back
                    </Button>
                    <Button name="next" onClick={this.goTo} className="Survey__goto__button--next">
                      Next
                    </Button>
                  </div>
                </Tab>
                <Tab heading="7">
                  <h2>Personal Plan or Family Plan?</h2>
                  <Select
                    name="personCount"
                    value={this.state.personCount}
                    handler={this.handleSelect}
                    options={selectOpt.personCount}
                  />
                  <div className="Survey__goto">
                    <Button name="back" onClick={this.goTo} className="Survey__goto__button--back">
                      Back
                    </Button>
                    <Button
                      name="next"
                      //type="accent"
                      // link={true}
                      // path="/home-page"
                      onClick={this.BackendCall.bind(this)}
                      className="Survey__goto__button--next"
                    >
                      Done
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Survey;
//export default withRouter(Survey);
