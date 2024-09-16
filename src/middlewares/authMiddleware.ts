import { Request, Response, NextFunction } from "express";
import env from "../config/envs";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: { _id: string };
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ error: "Not authorized" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    console.log(error);

    res.status(401).send({ error: "Not authorized" });
  }
};
