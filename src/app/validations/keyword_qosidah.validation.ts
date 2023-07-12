import Joi from "joi";

const keywordQosidahValidation = Joi.object({
  keyword: Joi.string().required(),
});

export { keywordQosidahValidation };
