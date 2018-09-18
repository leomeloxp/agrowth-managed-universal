import { Document } from 'mongoose';
import { Buyer, IBuyer, IBuyerDocument } from './Buyer';
import { IProduce, IProduceDocument, Produce } from './Produce';
import { ISupplier, ISupplierDocument, Supplier } from './Supplier';
import { IUser, IUserDocument, User } from './User';

// Aggregate  all models for easier importing elsewhere
export {
  Buyer,
  Produce,
  User,
  IBuyer,
  IProduce,
  IBuyerDocument,
  IProduceDocument,
  IUser,
  IUserDocument,
  ISupplier,
  ISupplierDocument,
  Supplier
};

export interface ICustomDocument extends Document {
  id: string;
}
