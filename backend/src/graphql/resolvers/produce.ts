import { IApolloCustomContext } from '../../middleware/generateContext';
import { IProduce } from '../../models';

export const createProduce = async (
  {} = {},
  { data }: any,
  { Produce }: IApolloCustomContext
): Promise<IProduce> => {
  const produce = new Produce(data);
  await produce.save();
  return produce;
};

export const updateProduce = async (
  {} = {},
  { id, data }: any,
  { Produce }: IApolloCustomContext
): Promise<IProduce | null> => {
  await Produce.update({ _id: id }, data).exec();
  const dbProduce = await Produce.findById(id).exec();
  return dbProduce;
};

export const produceList = async (
  {} = {},
  {} = {},
  { Produce }: IApolloCustomContext
): Promise<IProduce[]> => Produce.find();
