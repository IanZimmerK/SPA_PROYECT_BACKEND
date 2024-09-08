import moongose, { Document, InferSchemaType } from "mongoose";

const { Schema } = moongose;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  DNI: {
    type: Number,
    required: true,
  },
});

type usuarioDocument = InferSchemaType<typeof usuarioSchema> & Document;

const Usuario = moongose.model<usuarioDocument>("Usuario", usuarioSchema);

export { Usuario };
