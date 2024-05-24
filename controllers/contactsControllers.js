import HttpError from '../helpers/HttpError.js';
import { Contact } from '../models/contact.js';
import { getAllContactsPagination } from '../services/contacts.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const { page, limit, favorite } = req.query;

    const result = await getAllContactsPagination(
      req.user.id,
      page,
      limit,
      favorite
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Contact.findOne({ _id: id, owner: req.user.id });

    if (result === null) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndDelete({ _id: id });

    if (result === null) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const owner = req.user.id;

  try {
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Body must have at least one field');
  }

  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: id, owner: req.user.id },
      req.body,
      { new: true }
    );

    if (result === null) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: id, owner: req.user.id },
      { favorite },
      { new: true }
    );

    if (result === null) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
