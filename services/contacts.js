import { Contact } from '../models/contact';

export const getAllContacts = async (owner, page, limit, favorite) => {
  const skip = (page - 1) * limit;
  const filter = { owner };
  console.log(filter);
  if (favorite === true) {
    filter.favorite = true;
  }
  const result = await Contact.find(filter, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'email subscription');
  return result;
};
