import React from 'react';
import Header from '../components/Header';
import GoogleMaps from '../components/GoogleMaps';

const HomePage: React.SFC = () => (
  <React.Fragment>
    <Header pageTitle="Workspace Name" />
    <main>
      <h1>Hello world</h1>
    </main>
    <GoogleMaps.Map>
      <GoogleMaps.Marker />
    </GoogleMaps.Map>
  </React.Fragment>
);

export default HomePage;
