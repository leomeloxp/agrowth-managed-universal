import mongoose, { Model } from 'mongoose';
import { ICustomDocument } from './index';
import { ILocation, LocationSchema } from './Location';

export interface IBuyer {
  // System fields
  created: Date | number;
  updated: Date | number;
  id: string;
  // Custom fields
  name: string;
  phoneNumber: string;
  email: string;
  comments: string;
  locations: ILocation[];

}

export interface IBuyerDocument extends IBuyer, ICustomDocument {}

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

BuyerSchema.pre<IBuyerDocument>('save', function preSave(next): void {
  if (this.isModified()) {
    this.updated = Date.now();
  }
  next();
});

const Buyer: Model<IBuyerDocument> = mongoose.model('Buyer', BuyerSchema);

export { Buyer };
