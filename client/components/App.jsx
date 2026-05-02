import React from "react";
import "bulma/css/bulma.css";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Nav";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import BirdProfile from "./BirdProfile";
import Profile from "./Profile";
import Map from "./Map";
import Scrapbook from "./Scrapbook";

import { checkAuth } from "../actions/auth";

export class App extends React.Component {
  componentDidMount() {
    const confirmSuccess = () => {};
    this.props.dispatch(checkAuth(confirmSuccess));
  }

  render() {
    const { auth } = this.props;
    return (
      <>
        <Router>
          <div id="body-content" className="container content is-full">
            <h1 className="has-text-white pt-3 has-text-centered">
              <Link to="/">KererūGo</Link>
            </h1>
            
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/nav" component={Nav} />
            {auth.isAuthenticated && (
              <>
                <Route exact path="/" component={Map} />
                <Route path="/map" component={Map} />
                <Route exact path="/bird/:id" component={BirdProfile} />
                <Route path="/bird/:id/encounter" component={BirdProfile} />
                <Route path="/scrapbook" component={Scrapbook} />
                <Route path="/profile" component={Profile} />
              </>
            )}
            {!auth.isAuthenticated && 
              <>
                <Route exact path="/" component={Nav} />
                <Redirect to='/' />
              </>
            }
          </div>
        </Router>
      </>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    auth: globalState.auth,
    Scrapbook: globalState.Scrapbook,
    BirdProfile: globalState.BirdProfile,
  };
};

export default connect(mapStateToProps)(App);
