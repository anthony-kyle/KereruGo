import React, { createRef } from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
import { logoutUser } from "../actions/auth";
import { apiGetAllLocations, apiAddScrapbookEntry, apiCurrentCount } from "../apis/index";
import { receiveLocations, removeLocations } from "../actions/locations";
import NavLink from "./NavLink";
import Clusters from "./Clusters";

export class Map extends React.Component {
  constructor(props){
    super(props)
    this.mapRef = createRef()
  }
  state = {
    viewport: {
      latitude: -41.294105529785156,
      longitude: 174.7752685546875,
      width: "100%",
      height: "100%",
      zoom: 10
    },
    locations: [],
    selectedLocation: null,
    loaded: false,
    clusters: []
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      apiGetAllLocations()
        .then((locations) => {
          this.props.saveLocations(locations)
    })
        .catch((err) => console.log(err));
    }
  }

  viewportChange = (viewport) => {
    this.setState({
      viewport,
    });
  };

  // addToScrapbook = (location) => {
  //   apiAddScrapbookEntry(this.props.auth.user.id, location.birdId).then(
  //     this.setState({
  //       selectedLocation: location,
  //     })
  //   )
  //   const badgeId = 1
  //   apiCurrentCount(this.props.auth.user.id, badgeId)
  // }

  // distantBird = (location) => {
  //   this.setState({
  //     selectedLocation: {
  //       lat: location.lat,
  //       long: location.long,
  //       birdImg: "/images/mystery-bird.png",
  //       birdName: "Bird that is Too Far Away",
  //       locId: location.locId,
  //     },
  //   });
  // };

  // closePopup = (id, encountered) => {
  //   this.setState({
  //     selectedLocation: null,
  //   });

  //   if (encountered) {
  //     this.props.removeLocations(id);
  //   }
  // };

  geolocate = ({ coords }) => {
    const diameter = 100; // Proximity Area in Metres
    const metresToLatConversionFactor = 111111.111111111;
    const metresToLongConversionFactor = 83333.333333333;
    const latAdjust = diameter / 2 / metresToLatConversionFactor;
    const longAdjust = diameter / 2 / metresToLongConversionFactor;

    this.setState({
      userLat: Number(coords.latitude),
      userLong: Number(coords.longitude),
      minLat: Number(coords.latitude) - latAdjust,
      maxLat: Number(coords.latitude) + latAdjust,
      minLong: Number(coords.longitude) - longAdjust,
      maxLong: Number(coords.longitude) + longAdjust,
    });
  };

  render() {
    const { auth, logout, page } = this.props;
    
    return (
      <div className="card is-centered mx-4 mapContainer">
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={
            "pk.eyJ1IjoibWVldGpvaG5ncmF5IiwiYSI6ImNrZWJ5amJoYzAxeG4zNWs5ankxdHh5MWwifQ.7-Lg9dp4OdYmLML1jy5CDw"
          }
          mapStyle="mapbox://styles/meetjohngray/ckfk9geqz34xv19po854t66dz"
          onViewportChange={this.viewportChange}
          // Use below to get map bounds for cluster above
          ref={this.mapRef}
        >
          <Clusters 
            locations={this.props.locations} 
            mapRef={this.mapRef} 
            viewport={this.state.viewport}
            userLat={this.state.userLat}
            userLong={this.state.userLong}
            minLat={this.state.minLat}
            maxLat={this.state.maxLat}
            minLong={this.state.minLong}
            maxLong={this.state.maxLong}
            auth={this.props.auth}
            removeLocations={this.props.removeLocations}
        />
          {/* {this.props.locations.map((location) => {
            const lat = Number(location.lat);
            const long = Number(location.long);
            let popupFunc;
            if (
              this.state.minLat <= lat &&
              lat <= this.state.maxLat &&
              this.state.minLong <= long &&
              long <= this.state.maxLong
            ) {
              popupFunc = (e) => this.addToScrapbook(location);
            } else {
              popupFunc = (e) => {
                this.distantBird(location);
              };
            } */}

            {/* return (
              <Marker
                className="marker-btn"
                key={location.locId}
                latitude={Number(location.lat)}
                longitude={Number(location.long)}
              >
                <img src="/images/mystery-bird.png" onClick={popupFunc} />
              </Marker>
            );
          })} */}

          {/* {this.state.selectedLocation !== null ? (
            <Popup
              latitude={Number(this.state.selectedLocation.lat)}
              longitude={Number(this.state.selectedLocation.long)}
            >
              <>
                <img src={this.state.selectedLocation.birdImg} />

                {this.state.selectedLocation.birdId && (
                  <>
                    <p className="title is-5">
                      You found a {this.state.selectedLocation.birdName}!
                    </p>
                    <p className="title is-6">
                      <Link to={`/bird/${this.state.selectedLocation.birdId}/encounter`}>
                        Learn More
                      </Link>
                    </p>
                  </>
                )} */}

                {/* {!this.state.selectedLocation.birdId && (
                  <>
                    <p className="title is-5">Too Far Away</p>
                    <p className="title is-6">
                      The bird you have found is too far away. Get closer to
                      observe it.
                    </p>
                  </>
                )}  */}
                
                {/* hasOwnProperty checks if the selected location has a birdId defined, and then passes true or false through as an arg */}
                 {/* <a
                  onClick={() =>
                    this.closePopup(
                      this.state.selectedLocation.locId,
                      this.state.selectedLocation.hasOwnProperty("birdId")
                    )
                  }
                  className="closePopup"
                >
                  <i className="fas fa-times"></i>
                </a>
              </>
            </Popup>
          ) : null}  */}

          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            auto={true}
            onGeolocate={this.geolocate}
          />
        </ReactMapGL>
        <NavLink />
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
    page: () => {
      dispatch(togglePage("list", 1));
    },
    saveLocations: (locations) => {
      dispatch(receiveLocations(locations));
    },
    removeLocations: (locId) => {
      dispatch(removeLocations(locId));
    },
  };
};

const mapStateToProps = ({ auth, locations }) => {
  return {
    auth,
    locations,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
