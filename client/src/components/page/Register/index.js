import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser, loginUser } from '../../../actions/authentication';
import classnames from 'classnames';
// import Nav from "../../shared/Nav";
import { Button, Form, Grid, Header, Image } from 'semantic-ui-react';
import Logo from '../../../Resources/logo.png';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      full_name: this.state.full_name,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    };
    console.log(`register FE`);
    console.log(user);
    this.props
      .registerUser(user, this.props.history)
      .then(() => {
        this.props.loginUser({ email: user.email, password: user.password });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/survey');
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/survey');
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register-form">
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
              AutoMeal Register
            </Header>
            <Header as="h2" color="teal" textAlign="center">
              MADE BIG DIFF
            </Header>
            <Form.Input
              icon="user"
              iconPosition="left"
              type="text"
              placeholder="Name"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.email
              })}
              name="full_name"
              onChange={this.handleInputChange}
              value={this.state.full_name}
            />
            {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
            <Form.Input
              icon="lock"
              iconPosition="left"
              type="email"
              placeholder="Email"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.email
              })}
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            <Form.Input
              icon="lock"
              iconPosition="left"
              type="password"
              placeholder="Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password
              })}
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            <Form.Input
              icon="lock"
              iconPosition="left"
              type="password"
              placeholder="Confirm Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.confirm_password
              })}
              name="confirm_password"
              onChange={this.handleInputChange}
              value={this.state.confirm_password}
            />
            {errors.confirm_password && (
              <div className="invalid-feedback">{errors.confirm_password}</div>
            )}
            <Button content="Register" primary onClick={this.handleSubmit} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
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
    { registerUser, loginUser }
  )(Register)
);
