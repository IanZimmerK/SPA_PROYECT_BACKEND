import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IUsuario extends Document {
  nombre: string;
  apellido: string;
}

interface IServicio extends Document {
  nombre: string;
  precio: number;
}

interface IProfesional extends Document {
  nombre: string;
  apellido: string;
}

export interface ITurno extends Document {
  usuario: ObjectId | IUsuario;
  servicio: ObjectId | IServicio;
  profesional: ObjectId | IProfesional;
  fecha: Date;
  hora: string;
}

const TurnoSchema: Schema = new Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio" },
  profesional: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
});

export default mongoose.model<ITurno>("Turno", TurnoSchema);
