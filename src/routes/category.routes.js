import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory, // Controlador especial para la relación
} from "../controllers/category.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { categorySchema } from "../schemas/category.schema.js";

// Importamos nuestro guardian
import { verifyToken } from "../middlewares/auth.middleware.js";

export const categoryRouter = Router();

categoryRouter.get("/", verifyToken, getAllCategories);
categoryRouter.get("/:id",verifyToken, getCategoryById);
categoryRouter.post("/", verifyToken,  validateSchema(categorySchema), createCategory);
categoryRouter.put("/:id", validateSchema(categorySchema), updateCategory);
categoryRouter.delete("/:id", verifyToken,  deleteCategory);

// Ruta Relacional: Obtener productos por categoría
// Sigue el estándar REST: /recurso-padre/:id/recurso-hijo
categoryRouter.get("/:id/products", verifyToken,  getProductsByCategory);
