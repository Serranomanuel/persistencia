import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { successResponse } from "../utils/response.handler.js";

// REGISTRO
export const register = catchAsync(async (req, res) => {
    const { username, password } = req.body;

    // 1. Encriptar la contraseña (hash)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Guardar en la DB
    await UserModel.create(username, hashedPassword);

    return successResponse(res, 201, "Usuario creado con éxito");
});

// LOGIN
export const login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    // 1. Buscar si el usuario existe
    const user = await UserModel.findByUsername(username);
    if (!user) {
        const error = new Error("Usuario o contraseña incorrectos");
        error.statusCode = 401;
        return next(error);
    }

    // 2. Comparar la contraseña escrita con la encriptada de la DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error("Usuario o contraseña incorrectos");
        error.statusCode = 401;
        return next(error);
    }

    // 3. Si todo está bien, generar el Token
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || process.env.FIRMA_SECRETA_PROVISIONAL,
    );

    return successResponse(res, 200, "Login exitoso", { token });
});