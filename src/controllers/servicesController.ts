import { Request, Response } from "express";
import Servicios from "../models/Servicios";
import { Usuario } from "../models/Usuario";
import Turno from "../models/Turno";
import Opinion from "../models/Opinion";

// Diccionario de servicios predeterminados
const serviciosPredeterminados = [
  {
    nombre: "Masaje Relajante",
    descripcion: "Un masaje para aliviar el estrés y relajar el cuerpo.",
    precio: 50,
  },
  {
    nombre: "Facial Rejuvenecedor",
    descripcion: "Tratamiento facial que revitaliza y rejuvenece la piel.",
    precio: 70,
  },
  {
    nombre: "Tratamiento Corporal",
    descripcion: "Un tratamiento completo para el bienestar corporal.",
    precio: 100,
  },
  {
    nombre: "Lifting de Pestaña",
    descripcion: "Levanta y mejora el aspecto natural de tus pestañas.",
    precio: 40,
  },
  // Masajes
  {
    nombre: "Masaje Anti-stress",
    descripcion:
      "Masaje para reducir el estrés y promover la relajación profunda.",
    precio: 60,
  },
  {
    nombre: "Masaje Descontracturante",
    descripcion: "Alivia tensiones musculares profundas.",
    precio: 65,
  },
  {
    nombre: "Masaje con piedras calientes",
    descripcion: "Masaje con piedras volcánicas para una relajación extrema.",
    precio: 80,
  },
  {
    nombre: "Masaje Circulatorio",
    descripcion: "Estimula la circulación sanguínea para mejorar el bienestar.",
    precio: 70,
  },
  // Belleza
  {
    nombre: "Depilación facial",
    descripcion: "Depilación precisa para un rostro suave y limpio.",
    precio: 30,
  },
  {
    nombre: "Belleza de manos y pies",
    descripcion:
      "Tratamiento completo para cuidar y embellecer tus manos y pies.",
    precio: 50,
  },
  // Tratamientos Faciales
  {
    nombre: "Punta de Diamante",
    descripcion: "Microexfoliación para una piel más suave y luminosa.",
    precio: 90,
  },
  {
    nombre: "Limpieza profunda + Hidratación",
    descripcion: "Limpieza facial profunda seguida de una hidratación intensa.",
    precio: 85,
  },
  {
    nombre: "Crio Frecuencia Facial",
    descripcion:
      "Tratamiento de shock térmico para un lifting facial instantáneo.",
    precio: 95,
  },
  // Tratamientos Corporales
  {
    nombre: "VelaSlim",
    descripcion: "Reducción de la circunferencia corporal y celulitis.",
    precio: 120,
  },
  {
    nombre: "DermoHealth",
    descripcion: "Drenaje linfático que mejora la microcirculación de la piel.",
    precio: 110,
  },
  {
    nombre: "Criofrecuencia",
    descripcion: "Tratamiento corporal de efecto lifting instantáneo.",
    precio: 115,
  },
  {
    nombre: "Ultracavitación",
    descripcion:
      "Técnica reductora no invasiva para disminuir grasa localizada.",
    precio: 130,
  },
];

// Sembrar la base de datos con servicios predeterminados si no existen
export const AgregarServiciosPredeterminados = async () => {
  try {
    const count = await Servicios.countDocuments();
    if (count === 0) {
      await Servicios.insertMany(serviciosPredeterminados);
      console.log(
        "Los servicios predeterminados han sido añadidos a la base de datos."
      );
    } else {
      console.log("Ya existen servicios en la base de datos.");
    }
  } catch (error) {
    console.error("Error al sembrar los servicios:", error);
  }
};

export const traerServicios = async (req: Request, res: Response) => {
  try {
    const servicios = await Servicios.find();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
};

export const agregarServicio = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const newService = new Servicios({ nombre, descripcion, precio });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Error adding service" });
  }
};

export const getTurnos = async (req: Request, res: Response) => {
  try {
    // Obtener todos los turnos y hacer populate para los campos de usuario y servicio
    const turnos = await Turno.find()
      .populate("usuario") // Campos del modelo Usuario
      .populate("servicio"); // Campos del modelo Servicio

    res.status(200).json(turnos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los turnos", error });
  }
};

export const crearTurno = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.user?._id;
    const { servicioId, fecha, time } = req.body;

    // Verifica que los datos requeridos estén presentes
    if (!servicioId || !usuarioId || !fecha || !time) {
      return res.status(400).json({ mensaje: "Faltan datos requeridos." });
    }

    // Verifica que el servicio exista
    const servicio = await Servicios.findById(servicioId);
    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado." });
    }

    // Verifica que el usuario exista
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    const turnoExistente = await Turno.findOne({
      servicio: servicioId,
      fecha: fecha,
      hora: time,
    });

    if (turnoExistente) {
      return res
        .status(400)
        .json({ error: "El turno ya está reservado para esta fecha y hora." });
    }

    // Crea el nuevo turno
    const nuevoTurno = new Turno({
      servicio: servicioId,
      usuario: usuarioId,
      fecha: new Date(fecha),
      hora: time,
    });

    // Guarda el turno en la base de datos
    await nuevoTurno.save();

    // Responde con el turno creado
    res
      .status(201)
      .json({ mensaje: "Turno creado exitosamente.", turno: nuevoTurno });
  } catch (error) {
    console.error("Error al crear el turno:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

export const crearOpinion = async (req: Request, res: Response) => {
  const { text } = req.body;
  console.log(req.body);

  try {
    const newOpinion = new Opinion({ text, date: new Date().toISOString() });
    await newOpinion.save();
    res.status(201).json(newOpinion);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la opinión" });
  }
};

export const traerOpinion = async (req: Request, res: Response) => {
  try {
    const opiniones = await Opinion.find().sort({ date: -1 });
    res.json(opiniones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las opiniones" });
  }
};
