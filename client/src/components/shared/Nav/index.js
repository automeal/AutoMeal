import React, { Component } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authentication';
import { withRouter } from 'react-router-dom';
import './Nav.css';

class Navbar extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
          <a
            alt={user.full_name}
            title={user.full_name}
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px' }}
          />
          Logout
        </a>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <Button className="Nav__button" link={true} path="/" type="transparent">
          Home
        </Button>
        <Button className="Nav__button" link={true} path="/register" type="transparent">
          Register
        </Button>
        <Button className="Nav__button" link={true} path="/login" type="transparent">
          Login
        </Button>
        <Button className="Nav__button" link={true} path="/survey" type="transparent">
          Survey
        </Button>
        <Button className="Nav__button" link={true} path="/meal-plan" type="transparent">
          Meal Plan
        </Button>
        <Button className="Nav__button" link={true} path="/pantry" type="transparent">
          Pantry
        </Button>
        <Button className="Nav__button" link={true} path="/profile" type="transparent">
          User Profile
        </Button>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Navbar)
);
