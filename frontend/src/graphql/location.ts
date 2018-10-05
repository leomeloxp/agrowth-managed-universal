// import gql from 'graphql-tag';

// Copied from BE
export interface ILocation {
  created: Date | number;
  updated: Date | number;
  id: string;
  name: string;
  address: string;
  notes: string;
  coordinates: [number, number];
}
