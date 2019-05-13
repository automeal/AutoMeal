import React, { Component } from 'react';
import { Grid, Card, Image } from 'semantic-ui-react';
import InfiniteCarousel from 'react-leaf-carousel';
import recipeData from '../../page/RecipeResults/recipes';
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
      <Grid columns="equal" verticalAlign="middle" textAlign="center" divided stretched stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <div className="Login">
              <div className="Login__banner" />
              <div className="Login__data">
                <div className="Login__data__content">
                  <h1>New Recipes To Try</h1>
                  <ul>
                    <li> </li>
                  </ul>
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={15}>
            <div>
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
                  <Image style={{ width: '460px', height: '320px' }} alt="" src={ex3} />
                  <Card.Header>header</Card.Header>
                  <Card.Meta>Ingredients: </Card.Meta>
                  <Card.Description>Time to Make: </Card.Description>
                </Card>

                <Card fluid>
                  <Image style={{ width: '460px', height: '320px' }} alt="" src={ex1} />
                  <Card.Header>header</Card.Header>
                  <Card.Meta>Ingredients: </Card.Meta>
                  <Card.Description>Time to Make: </Card.Description>
                </Card>
                <Card fluid>
                  <Image style={{ width: '460px', height: '320px' }} alt="" src={ex2} />
                  <Card.Header>header</Card.Header>
                  <Card.Meta>Ingredients: </Card.Meta>
                  <Card.Description>Time to Make: </Card.Description>
                </Card>
                <Card fluid>
                  <Image style={{ width: '460px', height: '320px' }} alt="" src={ex4} />
                  <Card.Header>header</Card.Header>
                  <Card.Meta>Ingredients: </Card.Meta>
                  <Card.Description>Time to Make: </Card.Description>
                </Card>
                <Card fluid>
                  <Image style={{ width: '460px', height: '320px' }} alt="" src={ex5} />
                  <Card.Header>header</Card.Header>
                  <Card.Meta>Ingredients: </Card.Meta>
                  <Card.Description>Time to Make: </Card.Description>
                </Card>
                <Card fluid>
                  <Image style={{ width: '460px', height: '320px' }} alt="" src={ex6} />
                  <Card.Header>header</Card.Header>
                  <Card.Meta>Ingredients: </Card.Meta>
                  <Card.Description>Time to Make: </Card.Description>
                </Card>
              </InfiniteCarousel>
              <br />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Carousel;
