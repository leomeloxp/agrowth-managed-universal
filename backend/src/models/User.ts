import mongoose, { Model } from 'mongoose';
import { ICustomDocument } from './index';

export interface IUserDocument extends ICustomDocument {
  created: Date | number;
  id: string;
  name: string;
  updated: Date | number;
}

const UserSchema = new mongoose.Schema({
  created: {
    default: Date.now,
    type: Date
  },
  name: {
    required: true,
    type: String
  },
  updated: {
    type: Date
  }
});

UserSchema.pre<IUserDocument>('save', function preSave(next): void {
  if (this.isModified()) {
    this.updated = Date.now();
  }
  next();
});

const User: Model<IUserDocument> = mongoose.model('User', UserSchema);
export { User };
