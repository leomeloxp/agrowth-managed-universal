import { Document } from 'mongoose';

// Export models and interfaces from index.ts for easier importing elsewhere.
export { Buyer, IBuyerDocument } from './Buyer';
export { ILocationDocument, Location } from './Location';
export { IProduceDocument, Produce } from './Produce';
export { IPurchaseDocument, Purchase } from './Purchase';
export { ISupplierDocument, Supplier } from './Supplier';
export { IUserDocument, User } from './User';

export interface ICustomDocument extends Document {
  id: string;
}
