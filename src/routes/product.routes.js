import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { productSchema } from "../schemas/product.schema.js";

// IMPORTACIÓN CORREGIDA: Usamos validateToken y checkPermission
import { validateToken } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/autorization.js";

export const productRouter = Router();

// Rutas protegidas con Autenticación + Autorización
productRouter.get("/", validateToken, checkPermission("products.view"), getAllProducts);
productRouter.get("/:id", validateToken, checkPermission("products.view"), getProductById);
productRouter.post("/", validateToken, checkPermission("products.create"), validateSchema(productSchema), createProduct);
productRouter.put("/:id", validateToken, checkPermission("products.update"), validateSchema(productSchema), updateProduct);
productRouter.delete("/:id", validateToken, checkPermission("products.delete"), deleteProduct);