import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { categorySchema } from "../schemas/category.schema.js";
import { validateToken } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/autorization.js";

export const categoryRouter = Router();

// Rutas de Categorías con protección completa
categoryRouter.get("/", validateToken, checkPermission("categories.view"), getAllCategories);
categoryRouter.get("/:id", validateToken, checkPermission("categories.view"), getCategoryById);
categoryRouter.post("/", validateToken, checkPermission("categories.create"), validateSchema(categorySchema), createCategory);
categoryRouter.put("/:id", validateToken, checkPermission("categories.update"), validateSchema(categorySchema), updateCategory);
categoryRouter.delete("/:id", validateToken, checkPermission("categories.delete"), deleteCategory);