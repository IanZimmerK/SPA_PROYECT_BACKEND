import { Router } from "express";
import {
  agregarServicio,
  crearOpinion,
  crearTurno,
  getIngresosByTipoPagoAndDateRange,
  getPagos,
  getTurnos,
  getTurnosByProfesionalAndDateRange,
  registrarPago,
  traerOpinion,
  traerServicios,
} from "../controllers/servicesController";
import { authMiddleware } from "../middlewares/authMiddleware";

const rutasServicios = Router();

rutasServicios.get("/", traerServicios);
rutasServicios.get("/pagos", getPagos);
rutasServicios.get("/turnos", getTurnos);
rutasServicios.get("/opiniones", traerOpinion);
rutasServicios.get("/turnosProfesional", getTurnosByProfesionalAndDateRange);
rutasServicios.get("/ingresos", getIngresosByTipoPagoAndDateRange);
rutasServicios.post("/", agregarServicio);
rutasServicios.post("/pagos", registrarPago);
rutasServicios.post("/turno", authMiddleware, crearTurno);
rutasServicios.post("/opiniones", crearOpinion);

export default rutasServicios;
