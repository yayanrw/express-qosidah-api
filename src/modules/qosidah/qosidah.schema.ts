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
  qosidahDetail: Joi.array().items(createQosidahDetailSchema).required(),
});

const updateQosidahSchema = Joi.object({
  title: Joi.string().required(),
  titleLatin: Joi.string().allow(null).optional(),
  titleTranslate: Joi.string().allow(null).optional(),
  keyword: Joi.array().items(Joi.string()).optional(),
});

export { createQosidahSchema, updateQosidahSchema };
