// Exportamos la función que recibe el nombre del permiso como parámetro (Ej: "products.create")
export const checkPermission = (requiredPermission) => {
    
    // Retornamos la estructura clásica de un middleware de Express (req, res, next)
    return (req, res, next) => {
        
        // Obtenemos los roles/permisos del usuario. 
        // Asumimos que el middleware anterior (validateToken) guardó al usuario en req.user
        const userPermissions = req.user?.roles || [];

        // Verificamos si la lista de permisos del usuario NO incluye el permiso requerido
        if (!userPermissions.includes(requiredPermission)) {
            const error = new Error(`Acceso denegado: Se requiere el permiso '${requiredPermission}'`);
            error.statusCode = 403; // 403 Forbidden
            return next(error);
        }

        // Si tiene el permiso, permitimos que la petición continúe
        next();
    };
};