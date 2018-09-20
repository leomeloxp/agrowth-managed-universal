import React from 'react';
import { GoogleMapContext } from './GoogleMap';

export default class GoogleMapsMarker extends React.Component {
  render() {
    return (
      <GoogleMapContext.Consumer>
        {({ map }) => {
          const position = { lat: 49.1834367, lng: -2.1068161 };
          new google.maps.Marker({
            position,
            map,
            title: 'You'
          });
          return null;
        }}
      </GoogleMapContext.Consumer>
    );
  }
}
