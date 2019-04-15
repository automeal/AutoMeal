import React from 'react';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import food4 from '../../image/food4.jpg';

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const Head = ({ mobile }) => (
  <div className="ui fluid image">
    <img src={food4} alt="" />
    <div
      style={{
        position: 'absolute',
        bottom: '40%',
        width: '100%',
        height: 'auto',
      }}
    >
      <Container text textAlign="center">
        <Header
          as="h1"
          content="AutoMeal"
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em',
          }}
        />
        <Header
          as="h2"
          content="A custom meal plan generator based on your preferences."
          style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
          }}
        />
        <Link to="/register">
          <Button size="massive" color="orange">
            Register
            <Icon name="right arrow" />
          </Button>
        </Link>
      </Container>
    </div>
  </div>
);

Head.propTypes = {
  mobile: PropTypes.bool,
};

export default Head;
