import React from 'react';
import { Button } from 'react-bootstrap';
import { compose, withProps, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import racketIcon from '../../dist/lib/tennisRacket.png';

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
    containerElement: <div style={{ height: '365px' }} />,
    mapElement: <div style={{ height: '100%', width: '100%' }} />
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
      infoIndex: null
    }),
    {
      showInfo: ({ isOpen, infoIndex }) => ( index ) => ({
        isOpen: infoIndex !== index || !isOpen,
        infoIndex: index
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => {
  let defaultCenter = { lat: 40.72, lng: -73.9 };
  let singleCourtRender = false;
  let defaultZoom = 11;

  if (props.courts.length === 1 ) {
    singleCourtRender = true;
    defaultZoom = 13;
    defaultCenter = { 
      lat: Number ( props.courts[0].latitude ), 
      lng: Number ( props.courts[0].longitude ) 
    };
  }

  return (
    <GoogleMap
      defaultOptions={{ mapTypeControl: false }}
      defaultZoom={ defaultZoom }
      defaultCenter={ defaultCenter }
    >
      { props.courts.map(( court, index ) => {
        court = Object.assign({}, court, { index });
        let latitude = Number( court.latitude );
        let longitude = Number( court.longitude );
        return (
          <Marker
            key={ court.index }
            icon={ racketIcon }
            position={{ lat: latitude, lng: longitude }}
            onClick={() => props.showInfo(court.index)}
            animation={ google.maps.Animation.DROP }
          >
            { props.isOpen && props.infoIndex === court.index && (
              <InfoWindow onCloseClick={ props.showInfo }>
                <div>
                  <h3>{ court.name }</h3>
                  <p>
                    { court.numberOfCourts + ' ' + court.courtType + ' Courts' }
                  </p>
                  { !singleCourtRender && <Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={() => {
                      props.handleLocationChange( court.name );
                      props.showInfo();
                    }}>
                    Choose Court
                  </Button> }
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default Map;
