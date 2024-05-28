import { Contact } from '../models/contact.js';

export const getAllContactsPagination = async (
  owner,
  page,
  limit,
  favorite
) => {
  const skip = (page - 1) * limit;
  const filter = { owner };

  const total = await Contact.countDocuments(filter);
  const pages = Math.ceil(total / limit);

  if (favorite !== undefined) {
    filter.favorite = favorite;
  }
  const result = await Contact.find(filter, '-createdAt -updatedAt', {
    skip,
    limit: limit,
  }).populate('owner', 'email subscription');

  return {
    data: result,
    pages,
    total,
  };
};
