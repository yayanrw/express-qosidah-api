import Joi from "joi";

const paginationParamsSchema = Joi.object({
  page: Joi.string().required(),
  pageSize: Joi.string().required(),
  orderBy: Joi.string().default("id"),
  orderDirection: Joi.string().default("asc"),
  filter: Joi.object().optional(),
});

export { paginationParamsSchema };