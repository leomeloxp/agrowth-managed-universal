import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';
import buyer from './buyer';
import location from './location';
import produce from './produce';
import supplier from './supplier';
import user from './user';

const coreTypeDefs: DocumentNode = gql`
  type Mutation {
    createLocation(data: LocationUpdateInput): Location
    updateLocation(data: LocationUpdateInput!, id: ID!): Location
    createSupplier(data: SupplierUpdateInput): Supplier
    createProduce(data: ProduceUpdateInput): Produce
    updateProduce(data: ProduceUpdateInput!, id: ID!): Produce
    createBuyer(data: BuyerUpdateInput): Buyer
    updateBuyer(data: BuyerUpdateInput!, id: ID!): Buyer
    updateSupplier(data: SupplierUpdateInput!, id: ID!): Supplier
  }

  type Query {
    users: [User]
    buyersList: [Buyer]
    produceList: [Produce]
    supplierList: [Supplier]
    locationList: [Location]
  }
`;

export default [buyer, coreTypeDefs, location, produce, supplier, user];
