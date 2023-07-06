import "reflect-metadata";
import Server from "./core/config/Server";

/**
 * Instantiates Server
 */
const server: Server = new Server();

/** Starts listening */
server.listen();
