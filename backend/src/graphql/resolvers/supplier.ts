import { IApolloCustomContext } from '../../middleware/generateContext';
import { ISupplier } from '../../models';

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
