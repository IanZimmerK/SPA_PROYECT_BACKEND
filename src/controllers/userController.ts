import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario";
import { validator } from "../utils/validator";
import env from "../config/envs";

export const getTodosLosUsuarios = async (req: Request, res: Response) => {
  try {
    const users = await Usuario.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const crearUsuario = async (req: Request, res: Response) => {
  const { nombre, apellido, email, password, DNI, celular } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new Usuario({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      DNI,
      celular,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Generar el token JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "secretKey", // Usa una clave secreta segura desde tus variables de entorno
      { expiresIn: "1h" } // Ajusta el tiempo de expiración según tu necesidad
    );

    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ status: false, message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validar la entrada
    const validation = validator("nombre", email, password);
    if (validation.length !== 0) {
      return res.status(400).json({ status: false, message: validation });
    }

    // Buscar al usuario en la base de datos
    const userFound = await Usuario.findOne({ email });

    if (!userFound) {
      return res
        .status(404)
        .json({ status: false, error: ["Usuario inexistente"] });
    }

    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ status: false, error: ["Contraseña incorrecta"] });
    }

    // Generar token JWT
    const token = jwt.sign({ id: userFound?._id }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES,
    });

    return res.status(200).json({
      status: true,
      token: token,
      message: "Sesión iniciada",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Error interno del servidor" });
  }
};

export const datosUsuarioController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const user = await Usuario.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
