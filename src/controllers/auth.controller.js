import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.handler.js";

// REGISTRO
export const register = catchAsync(async (req, res) => {
    const { name, document, email, password } = req.body;

    // Encriptar contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // Guardar en DB con los nuevos campos
    await UserModel.create({
        name,
        document,
        email,
        password_hash
    });

    return successResponse(res, 201, "Usuario registrado con éxito");
});

// LOGIN
export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Buscar por email
    const user = await UserModel.findByEmail(email);
    if (!user) {
        const error = new Error("Credenciales inválidas");
        error.statusCode = 401;
        return next(error);
    }

    // 2. Comparar usando password_hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        const error = new Error("Credenciales inválidas");
        error.statusCode = 401;
        return next(error);
    }

    // 3. Generar Token (Incluyendo email en el payload)
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "firma_secreta_provisional",
        { expiresIn: "24h" }
    );

    // 4. Reto 1: Obtener roles/permisos
    const roles = await UserModel.getPermissionsByUserId(user.id);

    return successResponse(res, 200, "Sesión iniciada", { token, roles });
});