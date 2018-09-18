import mongoose, { Model } from 'mongoose';
import { ICustomDocument } from '.';

export interface ISupplier {
  created: Date | number;
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  updated: Date | number;
}

export interface ISupplierDocument extends ISupplier, ICustomDocument {}

const SupplierSchema = new mongoose.Schema({
  created: {
    default: Date.now,
    type: Date
  },
  email: {
    required: false,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  phoneNumber: {
    required: false,
    type: String
  },
  updated: {
    default: Date.now,
    type: Date
  }
});

SupplierSchema.pre<ISupplierDocument>('save', function preSave(next): void {
  if (this.isModified()) {
    this.updated = Date.now();
  }
  next();
});

const Supplier: Model<ISupplierDocument> = mongoose.model('Supplier', SupplierSchema);

export { Supplier };
