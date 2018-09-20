import { Document } from 'mongoose';

// Export models and interfaces from index.ts for easier importing elsewhere.
export { Buyer, IBuyer, IBuyerDocument } from './Buyer';
export { ILocation, ILocationDocument, Location } from './Location';
export { IProduce, IProduceDocument, Produce } from './Produce';
export { ISupplier, ISupplierDocument, Supplier } from './Supplier';
export { IUser, IUserDocument, User } from './User';

export interface ICustomDocument extends Document {
  id: string;
}
