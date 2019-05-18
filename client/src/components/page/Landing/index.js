import React from 'react';
import { Container, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react';
import SearchBox from '../../shared/Search';

import food from '../../image/food.jpg';
import LandingHead from '../../shared/LandingHead';

function Landing() {
  return (
    <div>
      {/*Top image header of landing page*/}
      <LandingHead />
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as="h3" textAlign="center" style={{ fontSize: '2em' }}>
            Features
          </Header>
        </Container>
        <Segment style={{ padding: '5em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle" columns="equal" textAlign="center">
            <Grid.Row>
              <Grid.Column>
                <Icon name="utensils" size="massive" />
                <Header as="h4" style={{ fontSize: '1.66em' }}>
                  Customizable Pantry
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Store the ingredients you have at home in a virtual pantry.
                </p>
              </Grid.Column>
              <Grid.Column>
                <Icon name="calendar" size="massive" />
                <Header as="h4" style={{ fontSize: '1.66em' }}>
                  Daily or Weekly Meal Planning
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Meal plan for the long-term or just on a day-to-day basis.
                </p>
              </Grid.Column>
              <Grid.Column>
                <Icon name="users" size="massive" />
                <Header as="h4" style={{ fontSize: '1.66em' }}>
                  Individual or Family Planning
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Organize meal plans for yourself or for your whole family.
                </p>
              </Grid.Column>
              <Grid.Column>
                <Icon name="weight" size="massive" />
                <Header as="h4" style={{ fontSize: '1.66em' }}>
                  Nutrition Tracking
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Track your nutrition info with the meals you prepare.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                Helping the average person make the meals they want to create.
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Not only can we help you plan out your meals, your calorie intake and nutrition
                information will be tracked for the meals you decide to make. Explore and search new
                recipes and organize your meals around your pantry items.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image bordered rounded size="large" src={food} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                "It's so straight-forward!"
              </Header>
              <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                "Trying out new recipes has never been easier."
              </Header>
              <p style={{ fontSize: '1.33em', textAlign: 'center' }}>
                <SearchBox route="ingredientSearch" />
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}

export default Landing;
