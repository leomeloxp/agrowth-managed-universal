import { IApolloCustomContext } from '../../lib/generateContext';
import { IPurchaseDocument } from '../../models';

export const createPurchase = async (
  {} = {},
  { data }: any,
  { Purchase }: IApolloCustomContext
): Promise<IPurchaseDocument> => {
  const purchase = new Purchase(data);
  await purchase.save();
  return purchase;
};

export const updatePurchase = async (
  {} = {},
  { id, data }: any,
  { Purchase }: IApolloCustomContext
): Promise<IPurchaseDocument | null> => {
  await Purchase.update({ _id: id }, data).exec();
  const dbPurchase = await Purchase.findById(id).exec();
  return dbPurchase;
};

export const purchaseList = async (
  {} = {},
  {} = {},
  { Purchase }: IApolloCustomContext
): Promise<IPurchaseDocument[]> => Purchase.find();
