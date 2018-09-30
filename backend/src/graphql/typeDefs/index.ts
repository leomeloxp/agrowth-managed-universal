import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';
import buyer from './buyer';
import location from './location';
import produce from './produce';
import supplier from './supplier';
import user from './user';

const coreTypeDefs: DocumentNode = gql`
  type Mutation {
    createBuyer(data: BuyerUpdateInput): Buyer
    createLocationOnSupplier(id: ID, data: LocationUpdateInput): Supplier
    createProduce(data: ProduceUpdateInput): Produce
    createSupplier(data: SupplierUpdateInput): Supplier
    updateBuyer(data: BuyerUpdateInput!, id: ID!): Buyer
    updateLocationOnSupplier(
      supplierId: ID!
      locationId: ID!
      data: LocationUpdateInput
    ): Supplier
    updateProduce(data: ProduceUpdateInput!, id: ID!): Produce
    updateSupplier(data: SupplierUpdateInput!, id: ID!): Supplier
  }

  type Query {
    buyerList: [Buyer]
    produceList: [Produce]
    supplierList: [Supplier]
    userList: [User]
  }
`;

export default [buyer, coreTypeDefs, location, produce, supplier, user];
