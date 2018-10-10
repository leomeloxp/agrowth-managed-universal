import mongoose, { Model, Types } from 'mongoose';
import { ICustomDocument } from './index';
import { IProduceDocument, ProduceSchema } from './Produce';

export interface IPurchaseDocument extends ICustomDocument {
  // System fields
  created: Date | number;
  updated: Date | number;
  id: string;
  // Custom fields
  produce: Types.DocumentArray<IProduceDocument>;
  quantity: string;
  price: string;
  status: boolean;
  comments: string;
}

export const PurchaseSchema = new mongoose.Schema({
  comments: {
    required: false,
    type: String
  },
  created: {
    default: Date.now,
    type: Date
  },
  price: {
    required: 'Please the total price',
    type: String
  },
  produce: [ProduceSchema],
  quantity: {
    required: 'Please provide an amount',
    type: String
  },
  status: {
    default: true,
    required: false,
    type: Boolean
  },
  updated: {
    default: Date.now,
    type: Date
  }
});

PurchaseSchema.pre<IPurchaseDocument>('save', function preSave(next): void {
  if (this.isModified()) {
    this.updated = Date.now();
  }
  next();
});

const Purchase: Model<IPurchaseDocument> = mongoose.model('Purchase', PurchaseSchema);

export { Purchase };
