import Joi from "joi";

const createUserValidation = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  role: Joi.string().required().valid("Admin", "User").required(),
  password: Joi.string().min(8).required(),
});

const updateUserValidation = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  role: Joi.string().required().valid("Admin", "User").required(),
});

const updatePasswordUserValidation = Joi.object({
  currentPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
});

const resetPasswordUserValidation = Joi.string().min(8).required();

export {
  createUserValidation,
  updateUserValidation,
  updatePasswordUserValidation,
  resetPasswordUserValidation,
};
