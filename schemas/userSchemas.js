import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

export const updateUserSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,20}$/)
    .message(
      'Password must be at least 8 characters long and contain only latin letters and numbers. But not more than 20 characters'
    )
    .required(),
});

export const validateVerifyEmail = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});
