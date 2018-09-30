import { IApolloCustomContext } from '../../lib/generateContext';
import { ISupplier, Location } from '../../models';

export const createLocationOnSupplier = async (
  {} = {},
  { id, data }: any,
  { Supplier }: IApolloCustomContext
): Promise<ISupplier> => {
  const supplier = await Supplier.findById(id).exec();
  if (supplier) {
    const location = new Location(data);
    supplier.locations.push(location);
    await supplier.save();
    const dbSupplier = (await Supplier.findById(id).exec()) as ISupplier;
    return dbSupplier;
  }
  throw new Error(`No valid supplier found from id ${id}`);
};

export const createSupplier = async (
  {} = {},
  { data }: any,
  { Supplier }: IApolloCustomContext
): Promise<ISupplier> => {
  const supplier = new Supplier(data);
  await supplier.save();
  return supplier;
};

export const updateSupplier = async (
  {} = {},
  { id, data }: any,
  { Supplier }: IApolloCustomContext
): Promise<ISupplier | null> => {
  await Supplier.update({ _id: id }, data).exec();
  const dbSupplier = await Supplier.findById(id).exec();
  return dbSupplier;
};

export const supplierList = async (
  {} = {},
  {} = {},
  { Supplier }: IApolloCustomContext
): Promise<ISupplier[]> => Supplier.find();
