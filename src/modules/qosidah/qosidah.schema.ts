import Joi from "joi";

const createQosidahSchema = Joi.object({
  title: Joi.string().required(),
  titleLatin: Joi.string(),
  titleTranslate: Joi.string(),
});

export { createQosidahSchema };
