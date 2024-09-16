import { Schema, model } from "mongoose";

interface IServicios {
  nombre: string;
  descripcion: string;
  precio: number;
}

const serviciosSchema = new Schema<IServicios>({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
});

const Servicios = model<IServicios>("Servicio", serviciosSchema);
export default Servicios;
