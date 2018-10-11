import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

const purchaseTypeDef: DocumentNode = gql`
  type Purchase {
    id: ID!
    createdAt: String
    updatedAt: String
    quantity: String
    produce: [Produce]
    price: String
    status: Boolean
    comments: String
  }

  input PurchaseUpdateInput {
    quantity: String
    price: String
    status: String
    comments: String
  }
`;

export default purchaseTypeDef;
