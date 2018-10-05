import React from 'react';
import GoogleMaps from '../components/GoogleMaps';
import Header from '../components/Header';

const HomePage: React.SFC = () => (
  <React.Fragment>
    <Header pageTitle='Home' />
    <main>
      <h1>Hello world</h1>
    </main>
    <GoogleMaps.Map lat={49.1834367} lng={-2.1068161}>
      <GoogleMaps.Marker lat={49.1834367} lng={-2.1068161} />
    </GoogleMaps.Map>
  </React.Fragment>
);

export default HomePage;
