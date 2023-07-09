import User from "../../src/core/interface/user.interface";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
