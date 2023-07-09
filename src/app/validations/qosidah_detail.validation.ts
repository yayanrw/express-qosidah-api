import Joi from "joi";

const qosidahDetailSchema = Joi.object({
  order: Joi.number().required(),
  lyrics: Joi.string().required(),
  lyricsLatin: Joi.string().allow(null).empty(""),
  lyricsTranslate: Joi.string().allow(null).empty(""),
  qosidahId: Joi.string().required(),
});

export { qosidahDetailSchema };
