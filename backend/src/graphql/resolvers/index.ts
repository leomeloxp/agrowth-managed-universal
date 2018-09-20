import { createProduce, updateProduce, produceList } from './produce';
import { createBuyer, updateBuyer, buyerList } from './buyer';
import { createSupplier, updateSupplier, supplierList } from './supplier';
import { userList } from './user';

export default {
  /**
   * Second argument in the functions below must have union type any due to
   * a bug in GraphQL typings, see {@link https://github.com/apollographql/graphql-tools/issues/704}
   * and {@link https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359}
   */
  Mutation: {
    createProduce,
    updateProduce,
    createBuyer,
    updateBuyer,
    createSupplier,
    updateSupplier
  },

  Query: {
    produceList,
    buyerList,
    supplierList,
    userList
  }
};
