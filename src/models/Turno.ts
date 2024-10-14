import { Schema, model, Document, ObjectId } from "mongoose";

// Define la interfaz para el modelo de Turno
interface ITurno extends Document {
  servicio: ObjectId;
  usuario: ObjectId;
  profesional: ObjectId; // Nuevo campo para el profesional
  fecha: Date;
  hora: string;
}

// Define el esquema para el modelo de Turno
const turnoSchema = new Schema<ITurno>({
  servicio: {
    type: Schema.Types.ObjectId,
    ref: "Servicio", // Referencia al modelo de Servicio
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario", // Referencia al modelo de Usuario
    required: true,
  },
  profesional: {
    type: Schema.Types.ObjectId,
    ref: "Usuario", // Referencia al modelo de Profesional (asumiendo que es del mismo modelo Usuario)
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
});

// Crea el modelo de Turno
const Turno = model<ITurno>("Turno", turnoSchema);

export default Turno;
