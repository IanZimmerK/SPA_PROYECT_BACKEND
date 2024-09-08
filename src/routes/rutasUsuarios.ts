import { Router } from "express";
import { crearUsuario, login } from "../controllers/userController";

const rutasUsuarios = Router();

rutasUsuarios.post("/crear", crearUsuario);
rutasUsuarios.post("/login", login);

export default rutasUsuarios;
