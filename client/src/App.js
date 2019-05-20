import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import 'font-awesome/css/font-awesome.css';

import './global.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import store from './store';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Landing from './components/page/Landing';
import Survey from './components/page/Survey';
import Plan from './components/page/Plan';
import HP from './components/page/HP';
import Register from './components/page/Register';
import Login from './components/page/Login';
import DayMealPlan from './components/page/MealPlan/daymealplan';
import WeekMealPlan from './components/page/MealPlan/weekmealplan';
import RecipeSearch from './components/page/RecipeSearch';
import HowItWorks from './components/page/HowItWorks';
import About from './components/page/About';
import Contact from './components/page/Contact';
import History from './components/page/History';

import DesktopContainer from './components/shared/Container/DesktopContainer';
import MobileContainer from './components/shared/Container/MobileContainer';

import Dashboard from './components/page/Dashboard';
import PrivateRoute from './utils/PrivateRoute';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <ResponsiveContainer>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/recipe-search" component={RecipeSearch} />
            <PrivateRoute path="/survey" component={Survey} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/home-page" component={HP} />
            <PrivateRoute path="/meal-plan" component={Plan} />
            <PrivateRoute path="/daily_mealplan" component={DayMealPlan} />
            <PrivateRoute path="/weekly_mealplan" component={WeekMealPlan} />
            <PrivateRoute path="/recipe_history" component={History} />
            <Route path="/how-it-works" component={HowItWorks} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </ResponsiveContainer>
        </Provider>
      </Router>
    );
  }
}

export default withRouter(App);
