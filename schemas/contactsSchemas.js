import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .message(
      'Please enter a valid phone number. Example: "(123) 456-7890", "123 456 7890", "+123-456-7890", "1234567890"'
    )
    .required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .message(
      'Please enter a valid phone number. Example: "(123) 456-7890", "123 456 7890", "+123-456-7890", "1234567890"'
    ),
  favorite: Joi.boolean(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const paginationSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).default(10),
  favorite: Joi.boolean().default(false),
});
