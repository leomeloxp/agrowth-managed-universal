import mongoose, { Model } from 'mongoose';
import { ICustomDocument } from './index';

export interface IProduceDocument extends ICustomDocument {
  created: Date | number;
  id: string;
  name: string;
  unit: string;
  updated: Date | number;
  [index: string]: any;
}

export const ProduceSchema = new mongoose.Schema({
  created: {
    default: Date.now,
    type: Date
  },
  name: {
    required: true,
    type: String
  },
  unit: {
    required: true,
    type: String
  },
  updated: {
    default: Date.now,
    type: Date
  }
});

ProduceSchema.pre<IProduceDocument>('save', function preSave(next): void {
  if (this.isModified()) {
    this.updated = Date.now();
  }
  next();
});

const Produce: Model<IProduceDocument> = mongoose.model(
  'Produce',
  ProduceSchema
);

export { Produce };
