import { IApolloCustomContext } from '../../lib/generateContext';
import { IPurchaseDocument } from '../../models';
// import { IProduceDocument, IPurchaseDocument, ISupplierDocument } from '../../models';

// export const createLocationOnSupplier = async (
//   {} = {},
//   { id, data }: any,
//   { Supplier, Location }: IApolloCustomContext
// ): Promise<ISupplierDocument> => {
//   const supplier = await Supplier.findById(id).exec();
//   if (supplier) {
//     const location = new Location(data);
//     supplier.locations.push(location);
//     await supplier.save().catch(err => {
//       console.error(err.message);
//       throw new Error(err);
//     });
//     const dbSupplier = (await Supplier.findById(
//       id
//     ).exec()) as ISupplierDocument;
//     return dbSupplier;
//   }
//   throw new Error(`No valid supplier found from id ${id}`);
// };

// export const updateLocationOnSupplier = async (
//   {} = {},
//   { supplierId, locationId, data }: any,
//   { Supplier }: IApolloCustomContext
// ): Promise<ISupplierDocument | null> => {
//   const supplier = await Supplier.findById(supplierId).exec();
//   if (supplier) {
//     const location: ILocationDocument = supplier.locations.id(locationId);
//     Object.keys(data).forEach(key => {
//       location[key] = data[key];
//     });
//     await supplier.save();
//     const dbSupplier = (await Supplier.findById(
//       supplierId
//     ).exec()) as ISupplierDocument;
//     return dbSupplier;
//   }
//   throw new Error(`No valid supplier found from id ${supplierId}`);
// };

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
