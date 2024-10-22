import { Schema, model, Document } from "mongoose";

// Definimos la interfaz del pago
interface IPago extends Document {
  nombre: string;
  email: string;
  metodoPago: string;
  cantidad: number;
  servicio: string;
  fechaPago: Date;
}

// Esquema de Mongoose
const PagoSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  metodoPago: { type: String, required: true },
  cantidad: { type: Number, required: true },
  servicio: { type: String, required: true },
  fechaPago: { type: String, required: true }, // Cambia a Date si prefieres almacenarlo como tipo de dato Date
});

// Exportamos el modelo
const Pago = model<IPago>("Pago", PagoSchema);

export default Pago;
