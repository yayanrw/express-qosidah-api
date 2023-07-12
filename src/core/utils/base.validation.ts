import { Request } from "express";
import { ValidationError } from "./exceptions";
import { Schema } from "joi";

const validate = (schema: Schema, req: Request) => {
  const result = schema.validate(req, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    throw new ValidationError(result.error.message);
  } else {
    return result.value;
  }
};

export { validate };
