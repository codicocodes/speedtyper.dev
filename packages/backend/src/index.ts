import startServer from "./server";
import "./connectors/discord";
import dotenv from "dotenv";
dotenv.config();

startServer();
