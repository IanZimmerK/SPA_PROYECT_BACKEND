import { Router } from "express";
import {
  crearUsuario,
  datosUsuarioController,
  getTodosLosUsuarios,
  login,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const rutasUsuarios = Router();

rutasUsuarios.get("/usuarios", getTodosLosUsuarios);
rutasUsuarios.get("/datos", authMiddleware, datosUsuarioController);
rutasUsuarios.post("/crear", crearUsuario);
rutasUsuarios.post("/login", login);

export default rutasUsuarios;
