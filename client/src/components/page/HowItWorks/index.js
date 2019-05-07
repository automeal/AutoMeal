import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

function HowItWorks() {
  return (
    <div>
      <br />
      <Header as="h1" textAlign="center">
        How to Use AutoMeal
      </Header>
      <Grid centered divided="vertically">
        <Grid.Row>
          <Grid.Column width={3}>
            <Icon circular inverted fitted name="computer" size="massive" />
          </Grid.Column>
          <Grid.Column width={8}>
            <br />
            <Header as="h2">Step One: Register</Header>
            <p style={{ fontSize: '25px' }}>
              If you're a new user, sign up for an account with our site. This will allow you to
              maintain a profile that stores your pantry, dietary restrictions, and allergies, and
              recipes that you enjoy.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <Icon circular inverted name="wpforms" size="massive" />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h2">Step Two: Fill Out Our Survey</Header>
            <p style={{ fontSize: '25px' }}>
              Fill out the survey to let us know what your preferences are. These preferences are
              saved with your profile so that all results will be accomodating{' '}
              <b>
                <i>YOUR</i>
              </b>{' '}
              needs.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <Icon circular inverted name="food" size="massive" />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h2">Step Three: Fill in Your Pantry</Header>
            <p style={{ fontSize: '25px' }}>
              Fill in your virtual pantry with items you keep in your kitchen so recipes found
              include items you already have at home.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <Icon circular inverted name="search" size="massive" />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h2">Step Four: Search for Recipes or Create a Meal Plan</Header>
            <p style={{ fontSize: '25px' }}>
              Using the answers from your survey, recipes and/or a meal plan can be generated based
              off of your preferences. The possibilities are endless!
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br />
    </div>
  );
}

export default HowItWorks;
