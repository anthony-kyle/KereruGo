import React from "react";
import { connect } from "react-redux";
import { loginUser, loginError } from "../actions/auth";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { username, password } = this.state;
    const confirmSuccess = () => {
      this.props.history.push("/map");
    };
    this.props.dispatch(loginUser({ username, password }, confirmSuccess));
  };
  render() {
    const { auth } = this.props;
    return (
      <>
        <div className="card is-centered mx-4 birdBackground auth">
          <form className="authForm" onSubmit={this.handleSubmit}>
            {auth.errorMessage && (
              <span className="has-text-danger is-large">
                {auth.errorMessage}
              </span>
            )}
            <input
              required
              className="input has-text-centered is-large is-fullwidth"
              placeholder="User Name"
              type="text"
              name="username"
              autoComplete="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              required
              className="input has-text-centered is-large is-fullwidth"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input
              className="button is-large is-fullwidth"
              value="Login"
              type="submit"
            />
          </form>

          <div className="redirect">
            <Link to="/register">
              <p>Not a registered user?</p>
              <p>Register here</p>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Login);
