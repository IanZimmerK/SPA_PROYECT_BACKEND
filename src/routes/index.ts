import { Router } from "express";
import rutasUsuarios from "./rutasUsuarios";
import rutasServicios from "./rutasServicios";

const router = Router();

router.use("/usuarios", rutasUsuarios);
router.use("/servicios", rutasServicios);

export default router;
