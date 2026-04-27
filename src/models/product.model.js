import { db } from "../config/db.js";

export class ProductModel {
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, description, price, stock, category_id } = data;
    const [result] = await db.query(
      "INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, stock, category_id]
    );
    return result;
  }

  static async update(id, data) {
    const { name, description, price, stock, category_id } = data;
    const [result] = await db.query(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?",
      [name, description, price, stock, category_id, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    return result;
  }
}