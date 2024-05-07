import * as contactsServices from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
  const contacts = await contactsServices.listContacts();
  return res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;

  const result = await contactsServices.getContactById(id);

  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  const result = await contactsServices.removeContact(id);

  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.json(result);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const result = await contactsServices.addContact(name, email, phone);

  return res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: 'Body must have at least one field' });
  }

  const { id } = req.params;
  const body = req.body;

  const result = await contactsServices.updateContact(id, body);

  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.json(result);
};
