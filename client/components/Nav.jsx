import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logoutUser } from "../actions/auth";
import BackLink from "./BackLink";
import Home from "./Home";
// import {HashRouter as Router, Route, Link} from 'react-router-dom'

class Nav extends React.Component {
  back = () => {
    return <Redirect to="/" />
  }
  render() {
    const { auth, logout } = this.props;
    return (
      <div className="card is-centered mx-4 navigation birdBackground">
     
       
        {auth.isAuthenticated ? (
          <>
            <Link to="/map">Map</Link>
            <Link to="/scrapbook">Scrapbook</Link>
            <Link to="/profile">Profile</Link>
            <a href="https://www.visitzealandia.com/Donate" target="_blank">Donate  <i className="fas fa-donate"></i></a>
            <Link to="/" onClick={() => logout()}>
              Logout
            </Link>
            <BackLink
              destination='/'
            />
          </>
        ) : (
          <>
          <div>
              <h1 className="tagline has-text-white has-text-weight-medium has-text-centered is-size-4">Encounters of the bird kind...</h1>
              <h5 className="tagline has-text-white has-text-weight-bold has-text-centered is-size-5">Register to get close.</h5>
          </div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      const confirmSuccess = () => ownProps.history.push("/");
      dispatch(logoutUser(confirmSuccess));
    },
  };
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
