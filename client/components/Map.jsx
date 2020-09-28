import React, { useEffect } from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
import { logoutUser } from "../actions/auth";
// import {  Link } from 'react-router-dom'
import { apiGetAllLocations, apiAddScrapbookEntry } from "../apis/index";
import { receiveLocations, removeLocations } from "../actions/locations";
import { receiveBirdProfile } from "../actions/bird_profile";
import NavLink from "./NavLink";
import BirdProfile from "./BirdProfile";

class Map extends React.Component {
  state = {
    viewport: {
      latitude: -41.294105529785156,
      longitude: 174.7752685546875,
      width: "100%",
      height: "100%",
      zoom: 30,
    },
    locations: [],
    selectedLocation: null,
    loaded: false,
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated){
    apiGetAllLocations()
    .then(locations => this.props.saveLocations(locations))
    .catch((err) => console.log(err))
    }
  }

  viewportChange = (viewport) => {
    this.setState({ viewport });
  };

  // changeLocation = (location) => {
  //   console.log(location)
  //   this.setState({selectedLocation: location})
  // }

  addToScrapbook = (location) => {
    apiAddScrapbookEntry(this.props.auth.user.id, location.birdId).then(
      this.setState({
        selectedLocation: location,
      })
    )
  }

  closePopup = (id) => {
    this.setState({
      selectedLocation: null,
    })
    console.log("Close Pop:", id )
    this.props.removeLocations(id)
  }

  
  render() {
    const { auth, logout, page } = this.props;

    return (
      <div className="card is-centered mx-4">
        <NavLink />

        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={
            "pk.eyJ1IjoibWVldGpvaG5ncmF5IiwiYSI6ImNrZWJ5amJoYzAxeG4zNWs5ankxdHh5MWwifQ.7-Lg9dp4OdYmLML1jy5CDw"
          }
          mapStyle="mapbox://styles/meetjohngray/ckfk9geqz34xv19po854t66dz"
          onViewportChange={this.viewportChange}
        >
          {this.props.locations.map((location) => {
            return (
              <Marker
                className="marker-btn"
                key={location.locId}
                latitude={Number(location.lat)}
                longitude={Number(location.long)}
              >
                <img
                  src="/images/mystery-bird.png"
                  onClick={(e) => this.addToScrapbook(location)}
                />
              </Marker>
            );
          })}

          {this.state.selectedLocation !== null ? (
            <Popup
              latitude={Number(this.state.selectedLocation.lat)}
              longitude={Number(this.state.selectedLocation.long)}
              //  onClose={this.closePopup}
            >
              <div>
                <img src={this.state.selectedLocation.birdImg} />
                <p className="title is-5">
                  You found a {this.state.selectedLocation.birdName}!
                </p>
                <p className="title is-6">
                  <Link to={`/bird/${this.state.selectedLocation.birdId}`}>
                    Learn More
                  </Link>
                  {/* <Redirect to={`/bird/${this.state.selectedLocation.birdId}`}>Learn More</Redirect>  */}
                </p>
                <button
                  onClick={() => this.closePopup(this.state.selectedLocation.locId)}
                  className="button is-small is-rounded"
                >
                  Close
                </button>
              </div>
            </Popup>
          ) : null}

          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            auto={true}
          />
        </ReactMapGL>
        {/* <Link to='/' className="button is-rounded" onClick={() => logout()}>Logout</Link> */}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      const confirmSuccess = () => ownProps.history.push("/");
      dispatch(logoutUser(confirmSuccess));
    },
    page: () => {
      dispatch(togglePage("list", 1))
    },
    saveLocations: (locations) => {
      dispatch(receiveLocations(locations))
    },
    removeLocations: (locId) => {
      dispatch(removeLocations(locId))
    }
  }
}

const mapStateToProps = ({ auth, locations }) => {
  return {
    auth,
    locations
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
