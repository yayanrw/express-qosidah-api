import Joi from "joi";

const qosidahDetailSchema = Joi.object({
  order: Joi.number().required(),
  lyrics: Joi.string().required(),
  lyricsLatin: Joi.string(),
  lyricsTranslate: Joi.string(),
  qosidahId: Joi.number().required(),
});

export { qosidahDetailSchema };
