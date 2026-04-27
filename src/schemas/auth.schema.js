import { z } from "zod";

// Esquema para el Registro de Usuarios
export const registerSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre debe ser un texto"
    })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(150, "El nombre no puede exceder los 150 caracteres"),

    document: z.string({
        required_error: "El número de documento es requerido",
        invalid_type_error: "El documento debe ser un texto"
    })
    .min(5, "El documento debe tener al menos 5 caracteres")
    .max(20, "El documento no puede exceder los 20 caracteres"),

    email: z.string({
        required_error: "El correo electrónico es requerido",
        invalid_type_error: "El correo debe ser un texto"
    })
    .email("El formato del correo electrónico no es válido")
    .max(150, "El correo no puede exceder los 150 caracteres"),

    password: z.string({
        required_error: "La contraseña es requerida"
    })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(255, "La contraseña no puede exceder los 255 caracteres")
});

// Esquema para el Inicio de Sesión (Login)
export const loginSchema = z.object({
    email: z.string({
        required_error: "El correo electrónico es requerido"
    })
    .email("El formato del correo electrónico no es válido"),

    password: z.string({
        required_error: "La contraseña es requerida"
    })
    .min(1, "La contraseña no puede estar vacía")
});

// Esquema para la Renovación de Tokens
export const refreshTokenSchema = z.object({
    token: z.string({
        required_error: "El token de renovación es requerido",
        invalid_type_error: "El token debe ser un texto"
    })
    .min(10, "El token proporcionado no tiene un formato válido")
});