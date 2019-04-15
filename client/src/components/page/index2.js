import React from "react";
import { Grid, Image, Button, Icon, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Landing extends React.Component {
  render() {
    return (
      <div>
        <Grid
          columns="equal"
          verticalAlign="middle"
          textAlign="center"
          divided
          stretched
          stackable={true}
        >
          <Grid.Column floated="left">
            <Image src="https://res.cloudinary.com/dpgnscxq3/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1554063255/automeal/iStock-589415708-808x454.jpg" />
          </Grid.Column>
          <Grid.Column floated="right" color="yellow">
            <div>
              <h1>AUTOMEAL CUSTOM MEAL PLAN GENERATOR</h1>
              <Divider />
              <ul>
                <p style={{ fontSize: 18 }}>
                  <li>
                    Build a Customizable Meal Plan Based On Your Preferences
                  </li>
                  <li>Track Calorie Intake and Nutrition Information</li>
                  <li>Explore and Search New Recipes</li>
                  <li>Organize Your Meals Around Your Pantry Items</li>
                </p>
              </ul>
              <Divider />
              <div>
                <p style={{ fontSize: 20 }}>
                  <b>Ready to get started?</b>
                </p>
                <Link to="/register">
                  <Button color="olive" size="huge" animated>
                    <Button.Content visible>Register</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </Link>
                <br />
                <br />

                {/*<Button
                        type="accent"
                        link={true}
                        path="/register"
                        className="Landing__data__button"
                      >
                        Register
                      </Button> */}
              </div>
              <div>
                <p style={{ fontSize: 20 }}>
                  <b>Already a user?</b>
                </p>
                <Link to="/login">
                  <Button color="olive" size="huge" animated>
                    <Button.Content visible>Login</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </Link>
                {/* <Button
                        type="accent"
                        link={true}
                        path="/login"
                        className="Landing_data_button"
                      >
                        Login
                      </Button> */}
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
