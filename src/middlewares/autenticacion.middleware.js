import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    // El token suele enviarse en el encabezado 'Authorization'
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error("No tienes permiso, por favor inicia sesión");
        error.statusCode = 401;
        return next(error);
    }

    // Extraemos solo el token (quitando la palabra 'Bearer ')
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_llave_super_secreta');
        req.user = decoded; // Guardamos los datos del usuario en la petición
        next(); // ¡Adelante! Puede pasar al controlador
    } catch (err) {
        const error = new Error("Token inválido o expirado");
        error.statusCode = 401;
        return next(error);
    }
};