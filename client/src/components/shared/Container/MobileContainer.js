// MOBILE VIEW OF OUR APPLICATION
// Still has some bugs ... but mainly works
// Bugs to Fix:
// - Menu doesn't work on home page or landing page
// - Menu doesn't work on meal plan page
// - Basically doesn't work on any pages with a big image header :(

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Container, Icon, Menu, Responsive, Segment, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authentication';
import { withRouter } from 'react-router-dom';

import Footer from '../../shared/Footer';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;
    const { fixed } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    // NavBar for an authorized user
    const authLinks = (
      <div>
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Link to="/home-page">
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
          </Link>
          <Link to="/dashboard">
            <Menu.Item as="a">Dashboard</Menu.Item>
          </Link>
          <Link to="/meal-plan">
            <Menu.Item as="a">Meal Plan</Menu.Item>
          </Link>
          <Link to="/recipe-search">
            <Menu.Item as="a">Recipe Search</Menu.Item>
          </Link>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 50, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
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
              </Menu>
            </Container>
          </Segment>

          {children}
          <Footer />
        </Sidebar.Pusher>
      </div>
    );

    // NavBar for unauthorized users
    const guestLinks = (
      <div>
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Link to="/">
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
          </Link>
          <Link to="/how-it-works">
            <Menu.Item as="a">How it Works</Menu.Item>
          </Link>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 50, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Link to="/login">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button as="a" inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Link>
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
          <Footer />
        </Sidebar.Pusher>
      </div>
    );

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {isAuthenticated ? authLinks : guestLinks}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
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
  )(MobileContainer)
);
