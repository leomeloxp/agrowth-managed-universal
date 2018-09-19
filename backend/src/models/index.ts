import { Document } from 'mongoose';
import { Buyer, IBuyer, IBuyerDocument } from './Buyer';
import { ILocation, ILocationDocument, Location } from './Location';
import { IProduce, IProduceDocument, Produce } from './Produce';
import { ISupplier, ISupplierDocument, Supplier } from './Supplier';
import { IUser, IUserDocument, User } from './User';

// Aggregate  all models for easier importing elsewhere
export {
  Buyer,
  Produce,
  User,
  IBuyer,
  ILocation,
  IProduce,
  IBuyerDocument,
  ILocationDocument,
  IProduceDocument,
  IUser,
  IUserDocument,
  ISupplier,
  ISupplierDocument,
  Location,
  Supplier
};

export interface ICustomDocument extends Document {
  id: string;
}
