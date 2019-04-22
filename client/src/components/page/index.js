import React from "react";
import "./Landing.css";
import { Button, Icon, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Landing = props => (
  <div className="Landing">
    <div className="Landing__banner" />
    <div className="Landing__data">
      <div className="Landing__data__content">
        <h1>AUTOMEAL CUSTOM MEAL PLAN GENERATOR</h1>
        <Divider />
        <p style={{ fontSize: 18 }}>
          <ul>
            <li>BUILD A CUSTOMIZABLE MEAL PLAN BASED ON YOUR PREFERENCES</li>
            <li>TRACK CALORIE INTAKE AND NUTRITION INFORMATION</li>
            <li>EXPLORE AND SEARCH NEW RECIPES</li>
            <li>ORGANIZE YOUR MEALS AROUND YOUR PANTRY ITEMS</li>
          </ul>
          <Divider />
        </p>
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
    </div>
  </div>
);

export default Landing;
