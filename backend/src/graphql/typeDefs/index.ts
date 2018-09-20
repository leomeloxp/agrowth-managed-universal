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
    createLocation(data: LocationUpdateInput): Location
    createProduce(data: ProduceUpdateInput): Produce
    createSupplier(data: SupplierUpdateInput): Supplier
    updateBuyer(data: BuyerUpdateInput!, id: ID!): Buyer
    updateLocation(data: LocationUpdateInput!, id: ID!): Location
    updateProduce(data: ProduceUpdateInput!, id: ID!): Produce
    updateSupplier(data: SupplierUpdateInput!, id: ID!): Supplier
  }

  type Query {
    buyersList: [Buyer]
    locationList: [Location]
    produceList: [Produce]
    supplierList: [Supplier]
    users: [User]
  }
`;

export default [buyer, coreTypeDefs, location, produce, supplier, user];
