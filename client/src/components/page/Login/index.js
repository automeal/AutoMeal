import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authentication";
import classnames from "classnames";
// import Nav from "../../shared/Nav";
import { ReCaptcha } from "react-recaptcha-google";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
      email: this.state.email,
      password: this.state.password,
      recaptchaToken: this.state.recaptchaToken
    };
    this.props.loginUser(user);
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  verifyCallback = recaptchaToken => this.setState({ recaptchaToken });

  render() {
    const { errors } = this.state;
    return (
      <div className="container" style={{ marginTop: "50px", width: "700px" }}>
        <h2 style={{ marginBottom: "40px" }}>Login</h2>
        <form onSubmit={this.handleSubmit}>
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
              Login User
            </button>
          </div>
        </form>
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
