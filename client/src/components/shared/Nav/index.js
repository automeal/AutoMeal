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
        <Button onClick={this.onLogout.bind(this)}>
          <href
            alt={user.name}
            title={user.name}
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px' }}
          />{' '}
          Logout
        </Button>
        <Button className="Nav__button" link={true} path="/dashboard" type="transparent">
          Home
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
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <Button className="Nav_button" link={true} path="/" type="transparent">
          Home Page
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

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
