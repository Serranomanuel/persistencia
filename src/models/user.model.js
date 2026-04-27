import { db } from "../config/db.js";

export class UserModel {
  // Crear un nuevo usuario (utilizado en el registro)
  static async create({ name, document, email, password_hash }) {
    const query = `
      INSERT INTO users (name, document, email, password_hash) 
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [name, document, email, password_hash]);
    return result;
  }

  // Buscar un usuario por su email (utilizado en login y validateToken)
  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(query, [email]);
    return rows[0]; // Retorna el usuario o undefined si no existe
  }

  // Obtener los permisos de un usuario por su ID
  // Esta función es crucial para que el middleware de autorización funcione
  static async getPermissionsByUserId(userId) {
    const query = `
      SELECT DISTINCT p.name 
      FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      INNER JOIN user_roles ur ON rp.role_id = ur.role_id
      WHERE ur.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);
    
    // Retornamos un arreglo simple de strings: ["products.view", "products.create", ...]
    return rows.map(row => row.name);
  }

  // Buscar un usuario por ID (opcional, útil para perfiles)
  static async findById(id) {
    const query = "SELECT id, name, document, email FROM users WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows[0];
  }
}