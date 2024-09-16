import { Router } from "express";
import {
  agregarServicio,
  crearOpinion,
  crearTurno,
  getTurnos,
  traerOpinion,
  traerServicios,
} from "../controllers/servicesController";

const rutasServicios = Router();

rutasServicios.get("/", traerServicios);
rutasServicios.get("/turnos", getTurnos);
rutasServicios.get("/opiniones", traerOpinion);
rutasServicios.post("/", agregarServicio);
rutasServicios.post("/turno", crearTurno);
rutasServicios.post("/opiniones", crearOpinion);

export default rutasServicios;
