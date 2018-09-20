import React from 'react';
import Header from '../components/Header';

const HomePage: React.SFC = () => (
  <React.Fragment>
    <Header pageTitle="Workspace Name" />
    <main>
      <h1>Hello world</h1>
    </main>
  </React.Fragment>
);

export default HomePage;
