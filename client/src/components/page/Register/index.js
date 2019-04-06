import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../../actions/authentication";
import classnames from "classnames";
// import ReCaptcha from "../../shared/ReCaptcha/ReCaptcha";
import { ReCaptcha } from "react-recaptcha-google";
// import Nav from "../../shared/Nav";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      recaptchaToken: "",
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
      full_name: this.state.full_name,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      recaptchaToken: this.state.recaptchaToken
    };
    this.props.registerUser(user, this.props.history);
  };

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  verifyCallback = recaptchaToken => this.setState({ recaptchaToken });

  render() {
    const { errors } = this.state;
    return (
      <div className="container" style={{ marginTop: "50px", width: "700px" }}>
        <h2 style={{ marginBottom: "40px" }}>Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.full_name
              })}
              name="full_name"
              autoComplete="full_name"
              onChange={this.handleInputChange}
              value={this.state.full_name}
            />
            {errors.full_name && (
              <div className="invalid-feedback">{errors.full_name}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email
              })}
              name="email"
              autoComplete="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password
              })}
              name="password"
              autoComplete="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.confirm_password
              })}
              name="confirm_password"
              autoComplete="confirm_password"
              onChange={this.handleInputChange}
              value={this.state.confirm_password}
            />
            {errors.confirm_password && (
              <div className="invalid-feedback">{errors.confirm_password}</div>
            )}
          </div>
          <ReCaptcha
            ref={el => {
              this.captchaDemo = el;
            }}
            size="normal"
            data-theme="dark"
            render="explicit"
            sitekey="6Ld_j5wUAAAAAJKGxKli9PdUu83G_z9IPC8bGtJL"
            verifyCallback={this.verifyCallback}
          />
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
