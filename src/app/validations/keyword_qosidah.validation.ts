import Joi from "joi";

const keywordQosidahSchema = Joi.object({
  keyword: Joi.string().required(),
});

export { keywordQosidahSchema };
