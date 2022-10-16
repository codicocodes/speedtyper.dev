import { MongoMemoryServer } from "mongodb-memory-server";
import { config } from "./config";

export = async function globalTeardown() {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  }
};
