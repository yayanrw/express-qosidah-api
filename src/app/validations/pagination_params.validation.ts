import Joi from "joi";

const paginationParamsValidation = Joi.object({
  page: Joi.string().required(),
  pageSize: Joi.string().required(),
  orderBy: Joi.string().allow(null).empty("").default("id"),
  orderDirection: Joi.string().allow(null).empty("").default("asc"),
  filter: Joi.object().optional(),
});

export { paginationParamsValidation };
