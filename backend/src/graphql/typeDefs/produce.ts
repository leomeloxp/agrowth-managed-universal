import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

const produceTypeDef: DocumentNode = gql`
  type Produce {
    id: ID!
    createdAt: String
    updatedAt: String
    name: String
    unit: String
    comments: String
  }

  input ProduceUpdateInput {
    name: String
    unit: String
    comments: String
  }
`;

export default produceTypeDef;
