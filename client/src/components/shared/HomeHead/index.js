import React from 'react';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import food5 from '../../image/food5.jpg';

/* eslint-disable react/no-multi-comp */

const HomeHead = ({ mobile }) => (
  <div className="ui fluid image">
    <img src={food5} alt="" />
    <div
      style={{
        position: 'absolute',
        bottom: '40%',
        width: '100%',
        height: 'auto'
      }}
    >
      <Container text textAlign="center">
        <Header
          as="h1"
          content="Welcome to AutoMeal"
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em'
          }}
        />
        <br />
        <br />
        <Button Button href="/meal-plan" color="teal" size="huge" animated>
          <Button.Content visible>Meal Plan</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
        <Button Button href="/recipe-search" color="teal" size="huge" animated>
          <Button.Content visible>Recipe Search</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </Container>
    </div>
  </div>
);

HomeHead.propTypes = {
  mobile: PropTypes.bool
};

export default HomeHead;
