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
        <p style={{ fontSize: '20px', textAlign: 'justified' }}>
          AutoMeal started out as an idea in a classroom at Hunter. Our goal is to provide an
          application that supplies users with recipes collected from the internet to form a daily
          or weekly meal plan based on the items they already have in their refrigerator or pantry
          and in accordance with their dietary and nutritional goals and limitations.
          <br />
          <br />
          Many people do not plan the meals they will eat during the day or week and this can waste
          time and money. In addition to this, many people do not have enough time to cook for
          themselves and they resort to eating out or ordering takeout. Planning your meals
          throughout the week can properly prepare you to eat healthier, save time, and save money.
          Oftentimes, people buy the same groceries over and over again but do not know exactly what
          they want to eat. By compiling recipes from the internet and allowing users to input the
          ingredients that they have on hand (or would like to eat), our application will output
          recipes and meal plans based on each user’s specific needs.
          <br />
          <br />
          We acknowledge that it can be hard to plan meals and cook with a busy schedule and we hope
          that AutoMeal makes it easier to do so with the tools and features we are making available
          to you.
        </p>
      </Segment>
    </div>
  );
}

export default About;
