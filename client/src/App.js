import React, { Component } from "react";
import "font-awesome/css/font-awesome.css";

import "./global.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";

import Navbar from "./components/shared/Nav";
import Landing from "./components/page/Landing";
import Survey from "./components/page/Survey";
import Plan from "./components/page/Plan";
import HP from "./components/page/HP";
import Register from "./components/page/Register";
import Footer from "./components/shared/Footer";
import Login from "./components/page/Login";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/survey" component={Survey} />
            <Route path="/meal-plan" component={Plan} />
            <Route path="/home-page" component={HP} />
            <Route path="/login" component={Login} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
