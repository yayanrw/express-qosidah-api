import Joi from "joi";

const createQosidahDetailSchema = Joi.object({
  order: Joi.number().required(),
  lyrics: Joi.string().required(),
  lyricsLatin: Joi.string().allow(null).empty(""),
  lyricsTranslate: Joi.string().allow(null).empty(""),
});

const createQosidahSchema = Joi.object({
  title: Joi.string().required(),
  titleLatin: Joi.string().allow(null).optional(),
  titleTranslate: Joi.string().allow(null).optional(),
  keyword: Joi.array().items(Joi.string()).optional(),
  published: Joi.boolean().default(false).optional(),
  qosidahDetail: Joi.array().items(createQosidahDetailSchema).required(),
});

const updateQosidahSchema = Joi.object({
  title: Joi.string().required(),
  titleLatin: Joi.string().allow(null).optional(),
  titleTranslate: Joi.string().allow(null).optional(),
  published: Joi.boolean().default(false).optional(),
  keyword: Joi.array().items(Joi.string()).optional(),
});

const updatePublishedQosidahSchema = Joi.boolean().required();

export { createQosidahSchema, updateQosidahSchema, updatePublishedQosidahSchema };
