import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  role: Joi.string().required().valid("Admin", "User").required(),
});

export { createUserSchema };
