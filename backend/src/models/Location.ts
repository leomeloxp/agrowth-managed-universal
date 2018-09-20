import mongoose, { Model } from 'mongoose';
import { ICustomDocument } from './index';

export interface ILocation {
  // System fields
  created: Date | number;
  updated: Date | number;
  id: string;
  // Custom fields
  name: string;
  address: string;
  notes: string;
  latitude: string;
  longitude: string;
}

export interface ILocationDocument extends ILocation, ICustomDocument {}

const LocationSchema = new mongoose.Schema({
  address: {
    required: false,
    type: String
  },
  created: {
    default: Date.now,
    type: Date
  },
  latitude: {
    required: true,
    type: String
  },
  longitude: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  notes: {
    required: false,
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
  }
  next();
});

const Location: Model<ILocationDocument> = mongoose.model(
  'Location',
  LocationSchema
);

export { Location };
