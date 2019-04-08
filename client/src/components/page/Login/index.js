import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authentication";
import { Message, Button, Form } from "semantic-ui-react";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
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
      <div className="center-screen">
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

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
