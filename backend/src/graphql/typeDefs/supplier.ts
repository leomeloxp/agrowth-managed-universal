import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

const supplierTypeDef: DocumentNode = gql`
  type Supplier {
    id: ID!
    createdAt: String
    updatedAt: String
    email: String
    locations: [Location]
    # purchase: [Purchase]
    name: String
    phoneNumber: String
    comments: String
  }

  input SupplierUpdateInput {
    email: String
    name: String
    phoneNumber: String
    comments: String
  }
`;

export default supplierTypeDef;
