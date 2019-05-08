import React, { Component } from 'react';
import { Header, Card } from 'semantic-ui-react';

import RecipeCard from '../../shared/RecipeCard/index.js';
import recipeData from './recipes.js';
import InfiniteCarousel from 'react-leaf-carousel';
import ex1 from '../../../Resources/ex1.jpeg';
import ex2 from '../../../Resources/ex2.jpg';
import ex3 from '../../../Resources/ex3.jpeg';
import ex4 from '../../../Resources/ex4.jpg';
import ex5 from '../../../Resources/ex5.jpg';
import ex6 from '../../../Resources/ex6.jpg';
import ex7 from '../../../Resources/ex7.jpg';

class RecipeResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: recipeData
    };
  }

  render() {
    return (
      <div>
        <br />
        <Header as="h1" textAlign="center">
          Recipe Results
        </Header>
        <br />
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            }
          ]}
          dots={true}
          showSides={true}
          sidesOpacity={1.0}
          sideSize={1}
          slidesToScroll={1}
          slidesToShow={1}
          scrollOnDevice={true}
        >
          <Card fluid>
            <img style={{ width: '420px', height: '320px' }} alt="" src={ex3} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>

          <Card fluid>
            <img style={{ width: '420px', height: '320px' }} alt="" src={ex1} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
          <Card fluid>
            <img style={{ width: '420px', height: '320px' }} alt="" src={ex2} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
          <Card fluid>
            <img style={{ width: '420px', height: '320px' }} alt="" src={ex4} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
          <Card fluid>
            <img style={{ width: '420px', height: '320px' }} alt="" src={ex5} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
          <Card fluid>
            <img style={{ width: '420px', height: '320px' }} alt="" src={ex6} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
        </InfiniteCarousel>
        <br />{' '}
      </div>
    );
  }
}

export default RecipeResults;
