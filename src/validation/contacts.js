import Joi from 'joi';

export const createContactSchema = Joi.object({
    name:Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least 3 characters',
        'string.max': 'Username should have at most 20 characters',
        'any.required': 'Username is required',
      }),
    phoneNumber:Joi.string().min(3).max(20).required().messages({
        'string.base': 'Invalid phone number format',
        'string.empty': 'Phone number is required',
      }),
    email:Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
      }),
    isFavourite:Joi.boolean(),
    contactType:Joi.string().valid("work", "home", "personal").required(),
});

export const updateContactSchema = Joi.object({
    name:Joi.string().min(3).max(20),
    phoneNumber:Joi.string().min(3).max(20),
    email:Joi.string().email(),
    isFavourite:Joi.boolean(),
    contactType:Joi.string().valid("work", "home", "personal"),
});