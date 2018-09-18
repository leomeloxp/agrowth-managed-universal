import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

const userTypeDef: DocumentNode = gql`
  type User {
    id: ID!
    createdAt: String
    updatedAt: String
    name: String!
  }
`;

export default userTypeDef;
