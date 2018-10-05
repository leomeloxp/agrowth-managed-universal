import mongoose, { Model, Types } from 'mongoose';
import { ICustomDocument } from '.';
import { ILocationDocument, LocationSchema } from './Location';

export interface ISupplierDocument extends ICustomDocument {
  created: Date | number;
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  updated: Date | number;
  locations: Types.DocumentArray<ILocationDocument>;
}

const SupplierSchema = new mongoose.Schema({
  created: {
    default: Date.now,
    type: Date
  },
  email: {
    required: false,
    type: String
  },
  locations: [LocationSchema],
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

const Supplier: Model<ISupplierDocument> = mongoose.model(
  'Supplier',
  SupplierSchema
);

export { Supplier };
