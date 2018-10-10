import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';
import buyer from './buyer';
import location from './location';
import produce from './produce';
import purchase from './purchase';
import supplier from './supplier';
import user from './user';

const coreTypeDefs: DocumentNode = gql`
  type Mutation {
    createBuyer(data: BuyerUpdateInput): Buyer
    createLocationOnSupplier(id: ID, data: LocationUpdateInput): Supplier
    createProduce(data: ProduceUpdateInput): Produce
    createPurchase(data: PurchaseUpdateInput): Purchase
    createSupplier(data: SupplierUpdateInput): Supplier
    updateBuyer(data: BuyerUpdateInput!, id: ID!): Buyer
    updateLocationOnSupplier(
      supplierId: ID!
      locationId: ID!
      data: LocationUpdateInput
    ): Supplier
    updateProduce(data: ProduceUpdateInput!, id: ID!): Produce
    updatePurchase(data: PurchaseUpdateInput!, id: ID!): Purchase
    updateSupplier(data: SupplierUpdateInput!, id: ID!): Supplier
  }

  type Query {
    buyerList: [Buyer]
    produceList: [Produce]
    purchaseList: [Purchase]
    supplierList: [Supplier]
    userList: [User]
  }
`;

export default [buyer, coreTypeDefs, location, produce, purchase, supplier, user];
