import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';

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
      <Provider store={store}>
        <Router>
          <ResponsiveContainer>
            <div>
              {/* <Navbar /> */}
              <Route exact path="/" component={Landing} />
              <Route path="/register" component={Register} />
              <Route path="/survey" component={Survey} />
              <Route path="/meal-plan" component={Plan} />
              <Route path="/home-page" component={HP} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </div>
          </ResponsiveContainer>
        </Router>
      </Provider>
    );
  }
}

export default withRouter(App);
