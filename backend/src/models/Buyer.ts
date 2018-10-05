import mongoose, { Model, Types } from 'mongoose';
import { ICustomDocument } from './index';
import { ILocationDocument, LocationSchema } from './Location';

export interface IBuyerDocument extends ICustomDocument {
  // System fields
  created: Date | number;
  updated: Date | number;
  id: string;
  // Custom fields
  name: string;
  phoneNumber: string;
  email: string;
  comments: string;
  locations: Types.DocumentArray<ILocationDocument>;
}

const BuyerSchema = new mongoose.Schema({
  comments: {
    required: false,
    type: String
  },
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
    required: 'Please provide a name',
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

BuyerSchema.pre<IBuyerDocument>('save', function preSave(next): void {
  if (this.isModified()) {
    this.updated = Date.now();
  }
  next();
});

const Buyer: Model<IBuyerDocument> = mongoose.model('Buyer', BuyerSchema);

export { Buyer };
