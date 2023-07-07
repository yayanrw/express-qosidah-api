import Joi from "joi";

const keywordQosidahSchema = Joi.object({
  keyword: Joi.string(),
});

export { keywordQosidahSchema };
