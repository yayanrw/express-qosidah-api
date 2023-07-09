import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  role: Joi.string().required().valid("Admin", "User").required(),
  password: Joi.string().min(8).required(),
});

export { userSchema };
