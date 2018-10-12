import { IApolloCustomContext } from '../../lib/generateContext';
import { ILocationDocument, IPurchaseDocument, ISupplierDocument } from '../../models';

export const createPurchaseOnSupplier = async (
  {} = {},
  { id, data }: any,
  { Supplier, Purchase }: IApolloCustomContext
): Promise<ISupplierDocument> => {
  const supplier = await Supplier.findById(id).exec();
  if (supplier) {
    const purchase = new Purchase(data);
    supplier.purchase.push(purchase);
    await supplier.save().catch(err => {
      console.error(err.message);
      throw new Error(err);
    });
    const dbSupplier = (await Supplier.findById(
      id
    ).exec()) as ISupplierDocument;
    return dbSupplier;
  }
  throw new Error(`No valid supplier found from id ${id}`);
};

export const updatePurchaseOnSupplier = async (
  {} = {},
  { supplierId, purchaseId, data }: any,
  { Supplier }: IApolloCustomContext
): Promise<ISupplierDocument | null> => {
  const supplier = await Supplier.findById(supplierId).exec();
  if (supplier) {
    const purchase: IPurchaseDocument = supplier.purchase.id(purchaseId);
    Object.keys(data).forEach(key => {
      purchase[key] = data[key];
    });
    await supplier.save();
    const dbSupplier = (await Supplier.findById(
      supplierId
    ).exec()) as ISupplierDocument;
    return dbSupplier;
  }
  throw new Error(`No valid supplier found from id ${supplierId}`);
};

export const createLocationOnSupplier = async (
  {} = {},
  { id, data }: any,
  { Supplier, Location }: IApolloCustomContext
): Promise<ISupplierDocument> => {
  const supplier = await Supplier.findById(id).exec();
  if (supplier) {
    const location = new Location(data);
    supplier.locations.push(location);
    await supplier.save().catch(err => {
      console.error(err.message);
      throw new Error(err);
    });
    const dbSupplier = (await Supplier.findById(
      id
    ).exec()) as ISupplierDocument;
    return dbSupplier;
  }
  throw new Error(`No valid supplier found from id ${id}`);
};

export const updateLocationOnSupplier = async (
  {} = {},
  { supplierId, locationId, data }: any,
  { Supplier }: IApolloCustomContext
): Promise<ISupplierDocument | null> => {
  const supplier = await Supplier.findById(supplierId).exec();
  if (supplier) {
    const location: ILocationDocument = supplier.locations.id(locationId);
    Object.keys(data).forEach(key => {
      location[key] = data[key];
    });
    await supplier.save();
    const dbSupplier = (await Supplier.findById(
      supplierId
    ).exec()) as ISupplierDocument;
    return dbSupplier;
  }
  throw new Error(`No valid supplier found from id ${supplierId}`);
};

export const createSupplier = async (
  {} = {},
  { data }: any,
  { Supplier }: IApolloCustomContext
): Promise<ISupplierDocument> => {
  const supplier = new Supplier(data);
  await supplier.save();
  return supplier;
};

export const updateSupplier = async (
  {} = {},
  { id, data }: any,
  { Supplier }: IApolloCustomContext
): Promise<ISupplierDocument | null> => {
  await Supplier.update({ _id: id }, data).exec();
  const dbSupplier = await Supplier.findById(id).exec();
  return dbSupplier;
};

export const supplierList = async (
  {} = {},
  {} = {},
  { Supplier }: IApolloCustomContext
): Promise<ISupplierDocument[]> => Supplier.find();
