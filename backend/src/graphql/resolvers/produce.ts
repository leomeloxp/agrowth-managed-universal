import { IApolloCustomContext } from '../../lib/generateContext';
import { IProduceDocument } from '../../models';

export const createProduce = async (
  {} = {},
  { data }: any,
  { Produce }: IApolloCustomContext
): Promise<IProduceDocument> => {
  const produce = new Produce(data);
  await produce.save();
  return produce;
};

export const updateProduce = async (
  {} = {},
  { id, data }: any,
  { Produce }: IApolloCustomContext
): Promise<IProduceDocument | null> => {
  await Produce.update({ _id: id }, data).exec();
  const dbProduce = await Produce.findById(id).exec();
  return dbProduce;
};

export const produceList = async (
  {} = {},
  {} = {},
  { Produce }: IApolloCustomContext
): Promise<IProduceDocument[]> => Produce.find();
