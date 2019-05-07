import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

function About() {
  return (
    <div>
      <Segment attached="top">
        <Header as="h1" textAlign="center">
          About AutoMeal
        </Header>
      </Segment>
      <Segment attached>
        <p style={{ fontSize: '20px' }}>
          AutoMeal started out as an idea in a classroom at Hunter. AutoMeal's goal is to allow easy
          access to recipes for people interested in cooking meals for themselves. We acknowledge
          that it can be hard to plan meals and cook with a busy schedule and we hope that AutoMeal
          makes it easier to do so with the tools and features we are making available to you.
        </p>
      </Segment>
    </div>
  );
}

export default About;
