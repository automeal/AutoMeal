import React, { Component } from 'react';
import { Responsive, Visibility, Segment, Menu, Container, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authentication';
import { withRouter } from 'react-router-dom';

import Footer from '../../shared/Footer';
import food3 from '../../image/food3.jpg';
//import './Nav.css';

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Menu
        fixed={fixed ? 'top' : null}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
          <Link to="/home-page" onClick={this.forceUpdate}>
            <Menu.Item as="a">Home</Menu.Item>
          </Link>
          <Link to="/dashboard" onClick={this.forceUpdate}>
            <Menu.Item as="a">Dashboard</Menu.Item>
          </Link>
          <Link to="/meal-plan" onClick={this.forceUpdate}>
            <Menu.Item as="a">Meal Plan</Menu.Item>
          </Link>
          <Link to="/survey" onClick={this.forceUpdate}>
            <Menu.Item as="a">Survey</Menu.Item>
          </Link>
          <Menu.Item position="right">
            <Link to="/login">
              <Button
                as="a"
                inverted={!fixed}
                primary={fixed}
                style={{ marginLeft: '0.5em' }}
                onClick={this.onLogout.bind(this)}
              >
                Log Out
              </Button>
            </Link>
          </Menu.Item>
        </Container>
      </Menu>
    );

    const guestLinks = (
      <Menu
        fixed={fixed ? 'top' : null}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
          <Link to="/" onClick={this.forceUpdate}>
            <Menu.Item as="a">Home</Menu.Item>
          </Link>
          <Link to="/how-it-works" onClick={this.forceUpdate}>
            <Menu.Item as="a">How It Works</Menu.Item>
          </Link>
          <Menu.Item position="right">
            <Link to="/login" onClick={this.forceUpdate}>
              <Button as="a" inverted={!fixed}>
                Log in
              </Button>
            </Link>
            <Link to="/register" onClick={this.forceUpdate}>
              <Button as="a" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                Sign Up
              </Button>
            </Link>
          </Menu.Item>
        </Container>
      </Menu>
    );

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{
              minHeight: 50,
              padding: '1em 0em',
              backgroundImage: { food3 },
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed'
            }}
            vertical
            color="yellow"
          >
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
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
  )(DesktopContainer)
);
