import { IApolloCustomContext } from '../../lib/generateContext';
import { IProduceDocument, IPurchaseDocument } from '../../models';

export const createProduceOnPurchase = async (
  {} = {},
  { id, data }: any,
  { Purchase, Produce }: IApolloCustomContext
): Promise<IPurchaseDocument> => {
  const purchase = await Purchase.findById(id).exec();
  if (purchase) {
    const produce = new Produce(data);
    purchase.produce.push(produce);
    await purchase.save().catch(err => {
      console.error(err.message);
      throw new Error(err);
    });
    const dbPurchase = (await Purchase.findById(
      id
    ).exec()) as IPurchaseDocument;
    return dbPurchase;
  }
  throw new Error(`No valid purchase found from id ${id}`);
};

export const updateProduceOnPurchase = async (
  {} = {},
  { purchaseId, produceId, data }: any,
  { Purchase }: IApolloCustomContext
): Promise<IPurchaseDocument | null> => {
  const purchase = await Purchase.findById(purchaseId).exec();
  if (purchase) {
    const produce: IProduceDocument = purchase.produce.id(produceId);
    Object.keys(data).forEach(key => {
      produce[key] = data[key];
    });
    await purchase.save();
    const dbPurchase = (await Purchase.findById(
      purchaseId
    ).exec()) as IPurchaseDocument;
    return dbPurchase;
  }
  throw new Error(`No valid purchase found from id ${purchaseId}`);
};


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
