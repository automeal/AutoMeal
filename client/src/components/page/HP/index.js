// import Nav from '../../shared/Nav';
import React from 'react';
// import './Landing.css';
import { Grid } from 'semantic-ui-react';
import HomeHead from '../../shared/HomeHead';
import Carousel from '../../shared/Carousel';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Grid columns="equal" verticalAlign="middle" textAlign="center" divided stretched stackable>
          <Grid.Row>
            <Grid.Column>
              <HomeHead />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h1>New Recipes To Try</h1>
              <Carousel />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
export default HomePage;
