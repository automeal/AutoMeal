import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Container, Icon, Menu, Responsive, Segment, Sidebar } from 'semantic-ui-react';
import { Router, Link } from 'react-router-dom';

import Head from '../../shared/HomeHead';
import Footer from '../../shared/Footer';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
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
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

export default MobileContainer;
