import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./Register.css";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.setState({
      newUser: this.state.displayName === "" ? "test" : this.state.displayName
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios
      .post(
        "/api/users/register",
        {
          full_name: this.state.displayName,
          email: this.state.email,
          password: this.state.password
        },
        config
      )
      .then(res => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => console.log(err));

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="displayName" bsSize="large">
            <ControlLabel>Display Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.displayName}
              onChange={this.handleChange}
              autoComplete="on"
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="on"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              autoComplete="on"
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
              autoComplete="on"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Register"
            loadingText="Signing up…"
          />
        </form>
      </div>
    );
  }
}
