import mongoose from "mongoose";
import env from "./envs";

const dbConfig = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    `mongodb+srv://lautaro:${env.DB_PASS}@spa.53fhv.mongodb.net/`
  );
};

export default dbConfig;
