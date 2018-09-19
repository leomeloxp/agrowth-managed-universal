import { IApolloCustomContext } from '../../middleware/generateContext';
import { IBuyer, ILocation, IProduce, ISupplier, IUser } from '../../models';
const resolvers = {
  /**
   * Second argument in the functions below must have union type any due to
   * a bug in GraphQL typings, see {@link https://github.com/apollographql/graphql-tools/issues/704}
   * and {@link https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359}
   */
  Mutation: {
    createProduce: async (
      {} = {},
      { data }: any,
      { Produce }: IApolloCustomContext
    ): Promise<IProduce> => {
      const produce = new Produce(data);
      await produce.save();
      return produce;
    },

    updateProduce: async (
      {} = {},
      { id, data }: any,
      { Produce }: IApolloCustomContext
    ): Promise<IProduce | null> => {
      await Produce.update({ _id: id }, data).exec();
      const dbProduce = await Produce.findById(id).exec();
      return dbProduce;
    },

    createBuyer: async (
      {} = {},
      { data }: any,
      { Buyer }: IApolloCustomContext
    ): Promise<IBuyer> => {
      const buyer = new Buyer(data);
      await buyer.save();
      return buyer;
    },

    updateBuyer: async (
      {} = {},
      { id, data }: any,
      { Buyer }: IApolloCustomContext
    ): Promise<IBuyer | null> => {
      await Buyer.update({ _id: id }, data).exec();
      const dbBuyer = await Buyer.findById(id).exec();
      return dbBuyer;
    },

    createSupplier: async (
      {} = {},
      { data }: any,
      { Supplier }: IApolloCustomContext
    ): Promise<ISupplier> => {
      const supplier = new Supplier(data);
      await supplier.save();
      return supplier;
    },

    updateSupplier: async (
      {} = {},
      { id, data }: any,
      { Supplier }: IApolloCustomContext
    ): Promise<ISupplier | null> => {
      await Supplier.update({ _id: id }, data).exec();
      const dbSupplier = await Supplier.findById(id).exec();
      return dbSupplier;
    },

    createLocation: async (
      {} = {},
      { data }: any,
      { Location }: IApolloCustomContext
    ): Promise<ILocation> => {
      const location = new Location(data);
      await location.save();
      return location;
    },

    updateLocation: async (
      {} = {},
      { id, data }: any,
      { Location }: IApolloCustomContext
    ): Promise<ILocation | null> => {
      await Location.update({ _id: id }, data).exec();
      const dbLocation = await Location.findById(id).exec();
      return dbLocation;
    },

  },

  Query: {
    produceList: async (
      {} = {},
      {} = {},
      { Produce }: IApolloCustomContext
    ): Promise<IProduce[]> => Produce.find(),

    buyersList: async (
      {} = {},
      {} = {},
      { Buyer }: IApolloCustomContext
    ): Promise<IBuyer[]> => Buyer.find(),

    supplierList: async (
      {} = {},
      {} = {},
      { Supplier }: IApolloCustomContext
    ): Promise<ISupplier[]> => Supplier.find(),

    locationList: async (
      {} = {},
      {} = {},
      { Location }: IApolloCustomContext
    ): Promise<ILocation[]> => Location.find(),

    users: async (
      {} = {},
      {} = {},
      { User }: IApolloCustomContext
    ): Promise<IUser[]> => User.find()
  }
};

export default resolvers;
