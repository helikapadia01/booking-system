import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().regex(/^.+@.+\..+$/),
  // password: Joi.string().required().min(6), // Minimum password length of 6 characters
  role: Joi.string().required().valid('Creator', 'Worker'),
  createdAt: Joi.date()
});

const bookingSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    creatorId: Joi.number().integer().required(),
    workerId: Joi.number().integer().allow(null), // Allow workerId to be null
    status: Joi.string().valid('Accepted', 'Rejected', 'Pending').required(),
});

export { userSchema, bookingSchema };