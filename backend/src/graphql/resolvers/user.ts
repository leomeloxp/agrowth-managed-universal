import { IApolloCustomContext } from '../../lib/generateContext';
import { IUser } from '../../models';

export const userList = async (
  {} = {},
  {} = {},
  { User }: IApolloCustomContext
): Promise<IUser[]> => User.find();
