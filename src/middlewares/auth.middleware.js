import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 2. Validamos que el header exista y tenga el estándar "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const error = new Error("No autorizado. Por favor inicia sesión.");
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verificar si el token es real y no ha expirado
        const decoded = jwt.verify(token, process.env.JWT_SECRET || process.env.FIRMA_SECRETA_PROVISIONAL);
        req.user = decoded; // Guardamos los datos del usuario en la petición por si los necesitamos
        next();
    } catch (err) {
        const error = new Error("Token inválido o expirado");
        error.statusCode = 401;
        return next(error);
    }
};