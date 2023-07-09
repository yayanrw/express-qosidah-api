import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  role: Joi.string().required().valid("Admin", "User").required(),
  password: Joi.string().min(8).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  role: Joi.string().required().valid("Admin", "User").required(),
});

const updatePasswordUserSchema = Joi.object({
  currentPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
});

const resetPasswordUserSchema = Joi.string().min(8).required();

export {
  createUserSchema,
  updateUserSchema,
  updatePasswordUserSchema,
  resetPasswordUserSchema,
};