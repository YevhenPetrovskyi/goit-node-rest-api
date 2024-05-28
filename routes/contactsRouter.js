import express from 'express';

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from '../controllers/contactsControllers.js';

import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
  paginationSchema,
} from '../schemas/contactsSchemas.js';

import validateBody from '../helpers/validateBody.js';
import validateObjectId from '../helpers/validateObjectId.js';
import validateQuery from '../helpers/validateQuery.js';

const contactsRouter = express.Router();

contactsRouter.get('/', validateQuery(paginationSchema), getAllContacts);

contactsRouter.get('/:id', validateObjectId, getOneContact);

contactsRouter.delete('/:id', validateObjectId, deleteContact);

contactsRouter.post(
  '/',

  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  '/:id',

  validateObjectId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  '/:id/favorite',

  validateObjectId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
