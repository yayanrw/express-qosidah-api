import express from "express";
import { createExpressServer } from "routing-controllers";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

/**
 * Server class
 * @class
 */
export default class Server {
  /** @type {express.Application} */
  private app: express.Application;
  /** @type {number} */
  private port: number;

  /**
   * Server constructor
   * initializes express server
   * and sets listening port
   * @constructor
   * @returns void
   */
  public constructor() {
    this.app = createExpressServer({
      cors: true,
      defaultErrorHandler: false,
      controllers: [path.join(__dirname + "/../controllers/*.ts")],
    });

    this.port = Number(process.env.PORT) || 3000;
  }

  /**
   * Listen method
   * @memberof Server
   * @returns void
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
