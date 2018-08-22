import React from 'react';
import { Button } from 'react-bootstrap';
import { compose, withProps, withHandlers, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

let GOOGLE_MAPS_API_KEY;
try {
  GOOGLE_MAPS_API_KEY = require('./../../../config/config.js').GOOGLE_MAPS_API_KEY;
} catch (err) {
  GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
}

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '850px' }} />,
    mapElement: <div style={{ height: '100%', width: '80%' }} />
  }),
  // withHandlers({
  //   onMarkerClustererClick: () => (markerClusterer) => {
  //     const clickedMarkers = markerClusterer.getMarkers();
  //     console.log(`Current clicked markers length: ${clickedMarkers.length}`);
  //     console.log(clickedMarkers);
  //   }
  // }),
  withStateHandlers(
    () => ({
      isOpen: false,
      infoIndex: null
    }),
    {
      showInfo: ({ isOpen, infoIndex }) => (index) => ({
        isOpen: infoIndex !== index || !isOpen,
        infoIndex: index
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => {
  // let {latitude, longitude} = props.cafes[0].coordinates;
  let latitude = 40.71;
  let longitude = -74;
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: latitude, lng: longitude }}
    >
      <Marker
        position={{ lat: latitude, lng: longitude }}
        onClick={() => props.showInfo(0)}
      >
        {props.isOpen &&
          props.infoIndex === props.infoIndex && (
            <InfoWindow onCloseClick={props.showInfo}>
              <div>
                <h3>InfoWindow Shows Here</h3>
                <Button bsStyle="primary" bsSize="small">
                  Select this Location
                </Button>
              </div>
            </InfoWindow>
          )}
      </Marker>
    </GoogleMap>
  );
});

export default Map;

