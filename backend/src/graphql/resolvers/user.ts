import { IApolloCustomContext } from '../../middleware/generateContext';
import { IUser } from '../../models';

export const userList = async (
  {} = {},
  {} = {},
  { User }: IApolloCustomContext
): Promise<IUser[]> => User.find();
