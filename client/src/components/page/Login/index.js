import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Image, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../actions/authentication';
import Logo from '../../../Resources/logo.png';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>
          {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image src={Logo} size="huge" />
            <Header as="h2" color="teal" textAlign="center">
              AutoMeal Login
            </Header>
            <Form className="attached fluid segment" onSubmit={this.handleSubmit}>
              <Form.Input
                icon="user"
                iconPosition="left"
                placeholder="Email"
                name="email"
                onChange={this.handleInputChange}
                error={errors.email !== undefined}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleInputChange}
                error={errors.password !== undefined}
              />
              <Message size="mini" hidden={!errors.email && !errors.password}>
                Incorrect email or password
              </Message>
              <Button content="Login" primary onClick={this.handleSubmit} />
            </Form>
            <Message attached="bottom" warning>
              New AutoChef?&nbsp;&nbsp;<a href="/Register">Sign up here!</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(Login)
);
