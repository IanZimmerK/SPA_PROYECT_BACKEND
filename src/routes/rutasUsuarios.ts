import { Router } from "express";
import {
  crearUsuario,
  datosUsuarioController,
  getProfesionales,
  getTodosLosUsuarios,
  login,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const rutasUsuarios = Router();

rutasUsuarios.get("/", getTodosLosUsuarios);
rutasUsuarios.get("/profesionales", getProfesionales);
rutasUsuarios.get("/datos", authMiddleware, datosUsuarioController);
rutasUsuarios.post("/crear", crearUsuario);
rutasUsuarios.post("/login", login);

export default rutasUsuarios;
