import express from "express";
import { createServer } from "http";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";
const server = express();
export const serverHTTP = createServer(server);

server.use(morgan("dev"));

server.use(cors());

server.use(express.json({ limit: "65mb" }));
server.use(express.urlencoded({ extended: true, limit: "65mb" }));

server.use(router);

export default serverHTTP;
