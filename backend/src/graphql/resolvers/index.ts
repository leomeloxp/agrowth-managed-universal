import { 
  buyerList,
  createBuyer,
  createLocationOnBuyer,
  updateBuyer,
  updateLocationOnBuyer
} from './buyer';
import { 
  createProduce,
  produceList,
  updateProduce 
} from './produce';
import {
  createProduceOnPurchase,
  createPurchase,
  // updateProduceOnPurchase,
  updatePurchase,
} from './purchase';
import {
  createLocationOnSupplier,
  createSupplier,
  supplierList,
  updateLocationOnSupplier,
  updateSupplier
} from './supplier';
import { userList } from './user';

export default {
  /**
   * Second argument in the functions below must have union type any due to
   * a bug in GraphQL typings, see {@link https://github.com/apollographql/graphql-tools/issues/704}
   * and {@link https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359}
   */
  Mutation: {
    createBuyer,
    createLocationOnBuyer,
    createLocationOnSupplier,
    createProduce,
    createProduceOnPurchase,
    createPurchase,
    createSupplier,
    updateBuyer,
    updateLocationOnBuyer,
    updateLocationOnSupplier,
    updateProduce,
    // updateProduceOnPurchase,
    updatePurchase,
    updateSupplier
  },

  Query: {
    buyerList,
    produceList,
    supplierList,
    userList
  }
};
