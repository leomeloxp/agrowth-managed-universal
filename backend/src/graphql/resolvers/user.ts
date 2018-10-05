import { IApolloCustomContext } from '../../lib/generateContext';
import { IUserDocument } from '../../models';

export const userList = async (
  {} = {},
  {} = {},
  { User }: IApolloCustomContext
): Promise<IUserDocument[]> => User.find();
