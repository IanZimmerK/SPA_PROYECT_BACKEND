import mongoose from "mongoose";

const opinionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: String, required: true },
});

const Opinion = mongoose.model("Opinion", opinionSchema);

export default Opinion;
