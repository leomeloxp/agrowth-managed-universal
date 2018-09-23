import React from 'react';
import { GoogleMapsContext } from '../GoogleMaps';

export interface IGoogleMapsMarkerProps {
  draggable?: boolean;
}

export default class GoogleMapsMarker extends React.Component<
  IGoogleMapsMarkerProps
> {
  addMarkerOnClick = (map: google.maps.Map) => {
    let marker = new google.maps.Marker();
    marker.setMap(map);
    google.maps.event.addListener(map, 'click', function(evt: any) {
      marker.setPosition(evt.latLng);
    });
  };
  render() {
    return (
      <GoogleMapsContext.Consumer>
        {({ map }) => {
          const { draggable } = this.props;
          const position = { lat: 49.1834367, lng: -2.1068161 };
          new google.maps.Marker({
            draggable,
            position,
            map,
            title: 'You'
          });
          return null;
        }}
      </GoogleMapsContext.Consumer>
    );
  }
}
