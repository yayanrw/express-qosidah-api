import Joi from "joi";

const logInValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export { logInValidation };
