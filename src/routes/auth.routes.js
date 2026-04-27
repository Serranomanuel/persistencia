import { Router } from "express";
import {
  register,
  login,
  // getProfile,    <-- Próximamente
  refreshToken
} from "../controllers/auth.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema, refreshTokenSchema } from "../schemas/auth.schema.js";

export const authRouter = Router();

// ==========================================
// Rutas Públicas (No requieren Token)
// ==========================================

// Registrar un nuevo usuario
authRouter.post("/register", validateSchema(registerSchema), register);

// Iniciar sesión (Devolverá el JWT)
authRouter.post("/login", validateSchema(loginSchema), login);


// ==========================================
// Rutas Privadas (Requerirán un middleware de Token)
// ==========================================

// Ruta para refrescar el token de validación 
// (Es pública porque Zod y el Controlador hacen la validación)
authRouter.post("/refresh", validateSchema(refreshTokenSchema), refreshToken);