import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

const buyerTypeDef: DocumentNode = gql`
  type Buyer {
    id: ID!
    createdAt: String
    updatedAt: String
    name: String
    phoneNumber: String
    email: String
    comments: String
    locations: [Location]
  }

  input BuyerUpdateInput {
    name: String!
    phoneNumber: String
    email: String
    comments: String
  }
`;

export default buyerTypeDef;
