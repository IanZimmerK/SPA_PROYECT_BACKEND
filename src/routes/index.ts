import { Router } from "express";
import rutasUsuarios from "./rutasUsuarios";

const router = Router();

router.use("/usuarios", rutasUsuarios);

export default router;
