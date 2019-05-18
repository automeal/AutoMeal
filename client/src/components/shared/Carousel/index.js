import React, { Component } from 'react';
import { Grid, Card, Image } from 'semantic-ui-react';
import InfiniteCarousel from 'react-leaf-carousel';
import recipeData from '../../page/RecipeSearch/recipes';
import ex1 from '../../../Resources/ex1.jpeg';
import ex2 from '../../../Resources/ex2.jpg';
import ex3 from '../../../Resources/ex3.jpeg';
import ex4 from '../../../Resources/ex4.jpg';
import ex5 from '../../../Resources/ex5.jpg';
import ex6 from '../../../Resources/ex6.jpg';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: recipeData
    };
  }
  render() {
    return (
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]}
        dots={true}
        showSides={true}
        sidesOpacity={1.0}
        sideSize={1}
        slidesToScroll={1}
        slidesToShow={1}
      >
        <Grid.Column>
          <Card fluid>
            <Image alt="" src={ex3} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card fluid>
            <Image alt="" src={ex1} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card fluid>
            <Image alt="" src={ex2} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card fluid>
            <Image alt="" src={ex4} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card fluid>
            <Image alt="" src={ex5} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card fluid>
            <Image alt="" src={ex6} />
            <Card.Header>header</Card.Header>
            <Card.Meta>Ingredients: </Card.Meta>
            <Card.Description>Time to Make: </Card.Description>
          </Card>
        </Grid.Column>
      </InfiniteCarousel>
    );
  }
}

export default Carousel;
