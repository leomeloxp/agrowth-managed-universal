import React from 'react';
import Header from '../components/Header';
import GoogleMap from '../components/GoogleMap';
import GoogleMapsMarker from '../components/GoogleMapsMarker';

const HomePage: React.SFC = () => (
  <React.Fragment>
    <Header pageTitle="Workspace Name" />
    <main>
      <h1>Hello world</h1>
    </main>
    <GoogleMap>
      <GoogleMapsMarker />
    </GoogleMap>
  </React.Fragment>
);

export default HomePage;
