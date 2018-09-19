import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

const locationTypeDef: DocumentNode = gql`
  type Location {
    id: ID!
    createdAt: String
    updatedAt: String
    name: String
    address: String
    notes: String
    latitude: String
    longititude: String
  }

  input LocationUpdateInput {
    name: String!
    address: String
    notes: String
    latitude: String
    longititude: String
  }
`;

export default locationTypeDef;
