import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "firma_secreta_provisional");
        
        // Buscamos al usuario para inyectar sus permisos en el req
        const user = await UserModel.findByEmail(decoded.email);
        if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

        const permissions = await UserModel.getPermissionsByUserId(user.id);

        // Inyectamos el usuario y sus roles en la petición para el Reto 2
        req.user = {
            ...user,
            roles: permissions
        };

        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
};