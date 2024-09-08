import { cleanEnv, host, port, str } from "envalid";
import "dotenv/config";

const env = cleanEnv(process.env, {
  PORT: port(),
  DB_PASS: str(),
});

export default env;
