// tslint:disable-next-line:no-implicit-dependencies
import { Context } from 'apollo-server-core';
import { Model } from 'mongoose';
import {
  Buyer,
  IBuyerDocument,
  ILocationDocument,
  IProduceDocument,
  ISupplierDocument,
  IUserDocument,
  Location,
  Produce,
  Supplier,
  User
} from '../models';

export interface IApolloCustomContext extends Context {
  Produce: Model<IProduceDocument>;
  Buyer: Model<IBuyerDocument>;
  Location: Model<ILocationDocument>;
  Supplier: Model<ISupplierDocument>;
  User: Model<IUserDocument>;
}

/**
 * Make Mongoose models available to our Apollo server through
 * the context argument in resolvers. This way we don't need to keep importing
 * model objects on every resolver
 */
export const generateContext = async (): Promise<IApolloCustomContext> => {
  return {
    Buyer,
    Location,
    Produce,
    Supplier,
    User
  };
};
