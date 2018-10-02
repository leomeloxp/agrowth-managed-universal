import { IApolloCustomContext } from '../../lib/generateContext';
import { IBuyer } from '../../models';

export const createLocationOnBuyer = async (
  {} = {},
  { id, data }: any,
  { Buyer, Location }: IApolloCustomContext
): Promise<IBuyer> => {
  const buyer = await Buyer.findById(id).exec();
  if (buyer) {
    const location = new Location(data);
    buyer.locations.push(location);
    await buyer.save();
    const dbBuyer = (await Buyer.findById(id).exec()) as IBuyer;
    return dbBuyer;
  }
  throw new Error(`No valid buyer found from id ${id}`);
};

// export const updateLocationOnBuyer = async (
//   {} = {},
//   { buyerId, locationId, data }: any,
//   { Buyer }: IApolloCustomContext
// ): Promise<IBuyer | null> => {
//   const buyer = await Buyer.findById(buyerId).exec();
//   if (buyer) {
//     const location = buyer.locations.id(locationId);
//     Object.keys(data).forEach(key => {
//       location[key] = data[key];
//     });
//     await buyer.save();
//     const dbBuyer = (await Buyer.findById(
//       buyerId
//     ).exec()) as IBuyer;
//     return dbBuyer;
//   }
//   throw new Error(`No valid buyer found from id ${buyerId}`);
// };


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
