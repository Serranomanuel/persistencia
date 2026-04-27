import pool from "../config/db.js";

export const UserModel = {
  // Buscar por email (para el login)
  findByEmail: async (email) => {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  // Crear usuario con los nuevos campos
  create: async (userData) => {
    const { name, document, email, password_hash } = userData;
    const [result] = await pool.query(
      "INSERT INTO users (name, document, email, password_hash) VALUES (?, ?, ?, ?)",
      [name, document, email, password_hash]
    );
    return result.insertId;
  },

  // Reto 1: Método para obtener permisos
  getPermissionsByUserId: async (userId) => {
    const query = `
      SELECT DISTINCT p.name 
      FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      JOIN roles r ON rp.role_id = r.id
      JOIN user_roles ur ON r.id = ur.role_id
      WHERE ur.user_id = ?
    `;
    const [rows] = await pool.query(query, [userId]);
    return rows.map(row => row.name);
  }
};