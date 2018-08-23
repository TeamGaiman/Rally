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
    containerElement: <div style={{ height: '425px' }} />,
    mapElement: <div style={{ height: '100%', width: '100%' }} />
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
  return (
    <GoogleMap
      defaultOptions={{ mapTypeControl: false }}
      defaultZoom={11}
      defaultCenter={{ lat: 40.72, lng: -73.9 }}
    >
      {props.courts.map((court, index) => {
        court.index = index;
        let latitude = Number(court.lat);
        let longitude = Number(court.lon);
        return (
          <Marker
            key={index + court.Prop_ID}
            icon={racketIcon}
            position={{ lat: latitude, lng: longitude }}
            onClick={() => props.showInfo(court.index)}
            animation={ google.maps.Animation.DROP }
          >
            {props.isOpen && props.infoIndex === court.index && (
              <InfoWindow onCloseClick={ props.showInfo }>
                <div>
                  <h3>{ court.Name }</h3>
                  <p>
                    { court.Location } <br />
                    { court.Indoor_Outdoor + ' ' + court.Tennis_Type + ' Court' }
                  </p>
                  <Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={() => {
                      props.handleLocationChange(court.Name);
                      props.showInfo();
                    }}>
                    Choose Court
                  </Button>
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

