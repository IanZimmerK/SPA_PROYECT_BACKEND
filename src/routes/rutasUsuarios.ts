import { Router } from "express";
import {
  crearUsuario,
  getTodosLosUsuarios,
  login,
} from "../controllers/userController";

const rutasUsuarios = Router();

rutasUsuarios.get("/usuarios", getTodosLosUsuarios);
rutasUsuarios.post("/crear", crearUsuario);
rutasUsuarios.post("/login", login);

export default rutasUsuarios;
