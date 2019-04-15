import React, { Component } from 'react';
import { Responsive, Visibility, Segment, Menu, Container, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Footer from '../../shared/Footer';
import food3 from '../../image/food3.jpg';

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
    //const { isAuthenticated, user } = this.props.auth;

    /*const authLinks = (
      <ul className="navbar-nav ml-auto">
        <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
          <a
            alt={user.name}
            title={user.name}
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px' }}
          />
          Logout
        </a>
      </ul>
  );*/

    /*const guestLinks = (
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
      </ul>
  );*/

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
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Link to="/">
                  <Menu.Item as="a" active>
                    Home
                  </Menu.Item>
                </Link>
                <Link to="/how-it-works">
                  <Menu.Item as="a">How It Works</Menu.Item>
                </Link>
                <Menu.Item position="right">
                  <Link to="/login">
                    <Button as="a" inverted={!fixed}>
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      as="a"
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: '0.5em' }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
        <Footer />
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

export default DesktopContainer;
