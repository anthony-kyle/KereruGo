import React, { useRef, useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import useSuperCluster from 'use-supercluster'
import {apiAddScrapbookEntry, apiCurrentCount } from "../apis/index";
import { receiveLocations, removeLocations } from "../actions/locations";
// import "mapbox-gl/dist/mapbox-gl.css"

function Clusters (props) {
  const{auth, locations, mapRef, viewport, userLat, userLong, minLat, minLong, maxLat, maxLong, removeLocations} = props

  const [selectedLocation, setSelectedLocation] = useState({})
  // Prepare data for supercluster
  const points = locations.map(location => ( {
    type: "Feature",
    properties: {
      cluster: false,
      locationID: location.locId
    },
    geometry: {type: "Point", coordinates: [location.long, location.lat], bird: location}
  }))

  const getBoundsArray = () => {
    const bounds = mapRef.current
    .getMap()
    .getBounds()
    const {_ne, _sw} = bounds
    return [_sw.lng, _sw.lat, _ne.lng, _ne.lat]
  }

  const bounds = mapRef.current 
  ? getBoundsArray()
  : null

  // Get Clusters
  const { clusters } = useSuperCluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: { radius: 75, maxZoom: 15}
  })

  const addToScrapbook = (bird) => {
    apiAddScrapbookEntry(auth.user.id, bird.birdId).then(()=>{
      setSelectedLocation(bird)
    })
    const badgeId = 1
    apiCurrentCount(auth.user.id, badgeId)
  }

  const distantBird = (location, locId) => {
    setSelectedLocation({
        long: Number(location[0]),
        lat: Number(location[1]),
        birdImg: "/images/mystery-bird.png",
        birdName: "Bird that is Too Far Away",
        locId: locId,
    })
  }

  const closePopup = (id, encountered) => {
    setSelectedLocation({});

    if (encountered) {
      removeLocations(id);
    }
  };

  let popupFunc
  return (
  clusters.map((cluster, i) => {
    // Every  cluster point has coordinates
    const [longitude, latitude] = cluster.geometry.coordinates
    // A point is either a cluster or a single bird
    const {
      cluster: isCluster,
      point_count: pointCount
    } = cluster.properties

    // Show a cluster
    if (isCluster) {
      return (
        <Marker
        key={`cluster-${cluster.id}`}
        latitude={latitude}
        longitude={longitude}
      >
        <div
          className="cluster-marker"
          style={{
            width: `${30 + (pointCount / points.length) * 30}px`,
            height: `${30 + (pointCount / points.length) * 30}px`
          }}
        >
          {pointCount}
        </div>
      </Marker>
      )
    } else {
        
      if (
        minLat <= Number(cluster.geometry.coordinates[1]) &&
        Number(cluster.geometry.coordinates[1]) <= maxLat &&
        minLong <= Number(cluster.geometry.coordinates[0]) &&
        Number(cluster.geometry.coordinates[0]) <= maxLong
      ){
        popupFunc = (e) => {
          addToScrapbook(cluster.geometry.bird)
        }
      } else {
        popupFunc = (e) => {
          distantBird(cluster.geometry.coordinates, cluster.properties.locationID);
        }
      }

      
      return (
        <React.Fragment key={`marker ${i} ${cluster}`}>
          <Marker
            className="marker-btn"
            key={cluster.properties.locationID}
            latitude={Number(cluster.geometry.coordinates[1])}
            longitude={Number(cluster.geometry.coordinates[0])}
          >
            <i className="fas fa-feather-alt" onClick={popupFunc}></i>
            {/* <img src="/images/mystery-bird.png" onClick={popupFunc} /> */}
          </Marker>

          {selectedLocation.hasOwnProperty('lat') ? (
  
          <Popup
            latitude= {selectedLocation.lat}
            longitude= {selectedLocation.long}
          >
            <>
              <img src={selectedLocation.birdImg} />

              {selectedLocation.birdId && (
                <>
                  <p className="title is-5">
                    You found a {selectedLocation.birdName}!
                  </p>
                  <p className="title is-6">
                    <Link to={`/bird/${selectedLocation.birdId}/encounter`}>
                      Learn More
                    </Link>
                  </p>
                </>
              )}

              {!selectedLocation.birdId && (
                <>
                  <p className="title is-5">Too Far Away</p>
                  <p className="title is-6">
                    The bird you have found is too far away. Get closer to
                    observe it.
                  </p>
                </>
              )}
        
        {/* hasOwnProperty checks if the selected location has a birdId defined, and then passes true or false through as an arg */}
              <a
              className="closePopup" 
              onClick={() =>
                  
                  closePopup(
                    selectedLocation.locId,
                    selectedLocation.hasOwnProperty("birdId")
                  )
                }
              >
                <i className="fas fa-times"></i>
              </a>
            </>
          </Popup>
        ) : null}
      </React.Fragment>
    )
    }
  })
 )
}

export default Clusters