import Joi from "joi";

const createQosidahDetailValidation = Joi.object({
  order: Joi.number().required(),
  lyrics: Joi.string().required(),
  lyricsLatin: Joi.string().allow(null).empty(""),
  lyricsTranslate: Joi.string().allow(null).empty(""),
});

const createQosidahValidation = Joi.object({
  title: Joi.string().required(),
  titleLatin: Joi.string().allow(null).optional(),
  titleTranslate: Joi.string().allow(null).optional(),
  keyword: Joi.array().items(Joi.string()).optional(),
  published: Joi.boolean().default(false).optional(),
  qosidahDetail: Joi.array().items(createQosidahDetailValidation).required(),
});

const updateQosidahValidation = Joi.object({
  title: Joi.string().required(),
  titleLatin: Joi.string().allow(null).optional(),
  titleTranslate: Joi.string().allow(null).optional(),
  published: Joi.boolean().default(false).optional(),
  keyword: Joi.array().items(Joi.string()).optional(),
});

const updatePublishedQosidahValidation = Joi.boolean().required();

export {
  createQosidahValidation,
  updateQosidahValidation,
  updatePublishedQosidahValidation,
};
