import { buyerList, createBuyer, updateBuyer } from './buyer';
import { createProduce, produceList, updateProduce } from './produce';
import {
  createLocationOnSupplier,
  createSupplier,
  supplierList,
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
    createLocationOnSupplier,
    createProduce,
    createSupplier,
    updateBuyer,
    updateProduce,
    updateSupplier
  },

  Query: {
    buyerList,
    produceList,
    supplierList,
    userList
  }
};
