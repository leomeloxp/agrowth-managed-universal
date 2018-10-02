import React from 'react';
import GoogleMaps from '../components/GoogleMaps';
import Header from '../components/Header';

const HomePage: React.SFC = () => (
  <React.Fragment>
    <Header pageTitle='Home' />
    <main>
      <h1>Hello world</h1>
    </main>
    <GoogleMaps.Map>
      <GoogleMaps.Marker />
    </GoogleMaps.Map>
  </React.Fragment>
);

export default HomePage;
