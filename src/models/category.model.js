import { db } from "../config/db.js";

export class CategoryModel {
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM categories");
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(name) {
    const [result] = await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
    return result;
  }

  static async update(id, name) {
    const [result] = await db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
    return result;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);
    return result;
  }
}