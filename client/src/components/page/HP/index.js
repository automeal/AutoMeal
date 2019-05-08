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
        <HomeHead />
        <Grid.Row>
          <Grid.Column width={8}>
            <div className="Login">
              <div className="Login__banner" />
              <div className="Login__data">
                <div className="Login__data__content">
                  <ul>
                    <Carousel />
                  </ul>
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </div>
    );
  }
}
export default HomePage;
