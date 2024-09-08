import { cleanEnv, host, port, str } from "envalid";
import "dotenv/config";

const env = cleanEnv(process.env, {
  PORT: port(),
  DB_PASS: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES: str(),
});

export default env;
