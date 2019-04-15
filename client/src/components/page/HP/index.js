// import Nav from '../../shared/Nav';
import React from 'react';
// import './Landing.css';
import { Button, Card, Icon, Grid, Image } from 'semantic-ui-react';
import food from './food.png';

class HomePage extends React.Component {
  render() {
    return (
      <Grid columns="equal" verticalAlign="middle" textAlign="center" divided stretched stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Image src={food} />
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="Login">
              <div className="Login__banner" />
              <div className="Login__data">
                <div className="Login__data__content">
                  <h1>Welcome to AutoMeal</h1>
                  <Button color="green" size="huge" animated>
                    <Button.Content visible>Generate Recipes</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                  <Button color="green" size="huge" animated>
                    <Button.Content visible>Start New Search</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                  <ul>
                    <li>Recipes You've Liked</li>
                    <Card.Group>
                      <Card
                        image="/images/avatar/large/elliot.jpg"
                        header="Elliot Baker"
                        meta="Friend"
                        description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
                      />
                      <Card
                        image="/images/avatar/large/elliot.jpg"
                        header="Elliot Baker"
                        meta="Friend"
                        description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
                      />
                      <Card
                        image="/images/avatar/large/elliot.jpg"
                        header="Elliot Baker"
                        meta="Friend"
                        description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
                      />
                    </Card.Group>
                    <li>Recipes to Try</li>
                    <li>Recently Searched Items</li>
                    <li>Other Home Page Stuff</li>
                  </ul>
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default HomePage;
