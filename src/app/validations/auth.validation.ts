import Joi from "joi";

const logInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8),
});

export { logInSchema };
