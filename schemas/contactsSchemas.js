import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .regex(
      /^\+?(\d{2}-?\d{3}-?\d{3}-?\d{2}-?\d{2})$|^\d{7}$|^\d{10}$|^\+?\d{12}$/
    )
    .message(
      'Number must have 7 numbers or 7 numbers and codes, like 3801234567 or 1234567'
    )
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string()
    .regex(
      /^\+?(\d{2}-?\d{3}-?\d{3}-?\d{2}-?\d{2})$|^\d{7}$|^\d{10}$|^\+?\d{12}$/
    )
    .message(
      'Number must have 7 numbers or 7 numbers and codes, like 3801234567 or 1234567'
    ),
});
