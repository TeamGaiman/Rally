import React from 'react';
import { Button } from 'react-bootstrap';
import { compose, withProps, withHandlers, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

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
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      // console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      // console.log(clickedMarkers);
    }
  }),
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
  let latitude = 40.71;
  let longitude = -74;
  console.log(props.courts)
  return (
    <GoogleMap
      defaultOptions={{ mapTypeControl: false }}
      defaultZoom={12}
      defaultCenter={{ lat: latitude, lng: longitude }}
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {props.courts.map((court, index) => {
          court.index = index;
          let latitude = Number(court.lat);
          let longitude = Number(court.lon);
          return (
            <Marker
              key = { court.Prop_ID }
              position={{ lat: latitude, lng: longitude }}
              onClick={() => props.showInfo(court.index)}
            >
              {props.isOpen && props.infoIndex === court.index && (
                <InfoWindow onCloseClick={props.showInfo}>
                  <div>
                    <h3>{court.Name}</h3>
                    <p>
                      {court.Location} <br />
                      {court.Indoor_Outdoor + ' ' + court.Tennis_Type + ' Court'}
                    </p>
                    <Button bsStyle="primary" bsSize="small">
                      Select this Location
                    </Button>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </MarkerClusterer>
    </GoogleMap>
  );
});

export default Map;

