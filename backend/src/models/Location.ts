import mongoose, { Model } from 'mongoose';
import { ICustomDocument } from './index';

export interface ILocationDocument extends ICustomDocument {
  // System fields
  created: Date | number;
  updated: Date | number;
  id: string;
  // Custom fields
  name: string;
  address: string;
  notes: string;
  coordinates: [number, number];
  // Index Signature to allow for location[key] lookups in code
  [index: string]: any;
}

export const LocationSchema = new mongoose.Schema({
  address: {
    required: false,
    type: String
  },
  coordinates: [
    {
      required: 'Please provide coordinates',
      type: Number
    }
  ],
  created: {
    default: Date.now,
    type: Date
  },
  name: {
    required: 'Please provide a name',
    type: String
  },
  notes: {
    required: false,
    type: String
  },
  type: {
    default: 'Point',
    type: String
  },
  updated: {
    default: Date.now,
    type: Date
  }
});

LocationSchema.pre<ILocationDocument>('save', function preSave(next): void {
  if (this.isModified()) {
    this.updated = Date.now();
    this.type = 'Point';
  }
  next();
});

const Location: Model<ILocationDocument> = mongoose.model(
  'Location',
  LocationSchema
);

export { Location };
