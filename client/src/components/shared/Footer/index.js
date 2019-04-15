import React from 'react';
import { Container, Header, Segment, Grid, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Footer = ({ mobile }) => (
  <Segment color="yellow" inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="About" />
            <List link inverted>
              <List.Item as="a">About AutoMeal</List.Item>
              <List.Item as="a">Contact Us</List.Item>
              <List.Item as="a">How it Works</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Services" />
            <List link inverted>
              <List.Item>Meal Planning</List.Item>
              <List.Item>Recipe Discovery</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" inverted>
              AutoMeal Meal Plan Generator
            </Header>
            <p>
              Find recipes based on ingredients you already have at home. Join a community of
              enthusiastic home cooks. Make your daily plans to cook easier. Choose AutoMeal.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

Footer.propTypes = {
  mobile: PropTypes.bool
};

export default Footer;
