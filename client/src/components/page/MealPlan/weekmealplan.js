// import Nav from '../../shared/Nav';
import React from 'react';
// import './Landing.css';
import { Card, Grid, Tab, Image } from 'semantic-ui-react';
import ex3 from '../../../Resources/ex3.jpeg';
import ex6 from '../../../Resources/ex6.jpg';
import ex4 from '../../../Resources/ex4.jpg';

class Mealplan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: {
        breakfast: {
          recipes: []
        },
        lunch: {
          recipes: []
        },
        dinner: {
          recipes: []
        },
        morning_snacks: {
          recipes: []
        },
        afternoon_snacks: {
          recipes: []
        }
      }
    };
  }

  render() {
    const panes = [
      {
        menuItem: 'Monday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <h1>Monday meal plan</h1>
            </Grid>
            <Card.Group itemsPerRow={3} raised>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex3} />
                <Card.Content>
                  <Card.Header>Breakfast</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex6} />
                <Card.Content>
                  <Card.Header>Lunch</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex4} />
                <Card.Content>
                  <Card.Header>Dinner</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Tuesday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <h1>Tuesday meal plan</h1>
            </Grid>
            <Card.Group itemsPerRow={3} raised>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex3} />
                <Card.Content>
                  <Card.Header>Breakfast</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex6} />
                <Card.Content>
                  <Card.Header>Lunch</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex4} />
                <Card.Content>
                  <Card.Header>Dinner</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Wednesday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <h1>Wednesday meal plan</h1>
            </Grid>
            <Card.Group itemsPerRow={3} raised>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex3} />
                <Card.Content>
                  <Card.Header>Breakfast</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex6} />
                <Card.Content>
                  <Card.Header>Lunch</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex4} />
                <Card.Content>
                  <Card.Header>Dinner</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Thursday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <h1>Thursday meal plan</h1>
            </Grid>
            <Card.Group itemsPerRow={3} raised>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex3} />
                <Card.Content>
                  <Card.Header>Breakfast</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex6} />
                <Card.Content>
                  <Card.Header>Lunch</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex4} />
                <Card.Content>
                  <Card.Header>Dinner</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Friday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <h1>Friday meal plan</h1>
            </Grid>
            <Card.Group itemsPerRow={3} raised>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex3} />
                <Card.Content>
                  <Card.Header>Breakfast</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex6} />
                <Card.Content>
                  <Card.Header>Lunch</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex4} />
                <Card.Content>
                  <Card.Header>Dinner</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Saturday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <h1>Saturday meal plan</h1>
            </Grid>
            <Card.Group itemsPerRow={3} raised>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex3} />
                <Card.Content>
                  <Card.Header>Breakfast</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex6} />
                <Card.Content>
                  <Card.Header>Lunch</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex4} />
                <Card.Content>
                  <Card.Header>Dinner</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Sunday',
        render: () => (
          <Tab.Pane>
            <Grid
              columns="equal"
              verticalAlign="middle"
              textAlign="center"
              divided
              stretched
              stackable
            >
              <h1>Sunday meal plan</h1>
            </Grid>
            <Card.Group itemsPerRow={3} raised>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex3} />
                <Card.Content>
                  <Card.Header>Breakfast</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex6} />
                <Card.Content>
                  <Card.Header>Lunch</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Image style={{ width: '460px', height: '320px' }} src={ex4} />
                <Card.Content>
                  <Card.Header>Dinner</Card.Header>
                  <Card.Meta>Sushi</Card.Meta>
                  <Card.Description>make time:</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Tab.Pane>
        )
      }
    ];
    return <Tab panes={panes} />;
  }
}

export default Mealplan;
