import { IApolloCustomContext } from '../../middleware/generateContext';
import { IBuyer } from '../../models';

export const createBuyer = async (
  {} = {},
  { data }: any,
  { Buyer }: IApolloCustomContext
): Promise<IBuyer> => {
  const buyer = new Buyer(data);
  await buyer.save();
  return buyer;
};

export const updateBuyer = async (
  {} = {},
  { id, data }: any,
  { Buyer }: IApolloCustomContext
): Promise<IBuyer | null> => {
  await Buyer.update({ _id: id }, data).exec();
  const dbBuyer = await Buyer.findById(id).exec();
  return dbBuyer;
};

export const buyerList = async (
  {} = {},
  {} = {},
  { Buyer }: IApolloCustomContext
): Promise<IBuyer[]> => Buyer.find();
