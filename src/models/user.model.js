import pool from "../config/db.js";

export const UserModel = {
    // Para registrar un nuevo usuario
    create: async (username, hashedPassword) => {
        const [result] = await pool.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword]
        );
        return result.insertId;
    },

    // Para buscar un usuario por su nombre (útil en el Login)
    findByUsername: async (username) => {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        return rows[0]; // Retorna el usuario o undefined
    }
};