import React from "react";
import { connect } from "react-redux";
import { loginError, registerUserRequest } from "../actions/auth";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Register extends React.Component {
  state = {
    username: "",
    // first_name: '',
    // last_name: '',
    password: "",
    confirm_password: "",
  };

  componentDidMount() {
    this.props.dispatch(loginError(""));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    let {
      username,
      password,
      confirm_password,
      first_name,
      last_name,
    } = this.state;
    if (confirm_password != password)
      return this.props.dispatch(loginError("Passwords don't match"));
    const confirmSuccess = () => {
      this.props.history.push("/");
    };
    this.props.dispatch(
      registerUserRequest(
        { username, password, first_name, last_name },
        confirmSuccess
      )
    );
  };

  render() {
    const { auth } = this.props;
    return (
      <div className="card is-centered mx-4 birdBackground auth">
        <form className="authForm" onSubmit={this.handleSubmit}>
          {auth.errorMessage && (
            <span className="has-text-danger is-large">
              {auth.errorMessage}
            </span>
          )}

          <input
            required
            className="input is-large has-text-centered is-fullwidth"
            placeholder="User Name"
            type="text"
            name="username"
            autoComplete="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <div className="columns">
            <input
              required
              className="input is-large has-text-centered"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            <input
              required
              className="input is-large has-text-centered"
              placeholder="Confirm Password"
              type="password"
              name="confirm_password"
              autoComplete="new-password"
              onChange={this.handleChange}
              value={this.state.confirm_password}
            />
          </div>

          <input
            className="button is-large is-fullwidth"
            value="Register"
            type="submit"
          />
        </form>

        <div className="redirect">
          <Link to="/login">
            <p>Already a registered user?</p>
            <p>Login here</p>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Register);
