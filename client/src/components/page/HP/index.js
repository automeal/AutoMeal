// import Nav from '../../shared/Nav';
import React from 'react';
// import './Landing.css';
import { Button, Icon, Grid, Image } from 'semantic-ui-react';
import food from './food.png';
import HomeHead from '../../shared/HomeHead';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <HomeHead />
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
                    <ul>
                      <li>Recipes You've Liked</li>
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
      </div>
    );
  }
}

export default HomePage;
