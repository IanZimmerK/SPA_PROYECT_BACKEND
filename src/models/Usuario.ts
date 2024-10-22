import mongoose, { Document, InferSchemaType } from "mongoose";

const { Schema } = mongoose;

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
    unique: true, // Asegúrate de que el correo electrónico sea único
  },
  password: {
    type: String,
    required: true,
  },
  DNI: {
    type: Number,
    required: true,
  },
  celular: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    enum: ["cliente", "profesional", "admin", "secretaria"], // Definimos los valores permitidos
    required: true, // Aseguramos que este campo sea requerido
  },
});

type usuarioDocument = InferSchemaType<typeof usuarioSchema> & Document;

const Usuario = mongoose.model<usuarioDocument>("Usuario", usuarioSchema);

export { Usuario };
