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

// Importamos nuestro guardian
import { verifyToken } from "../middlewares/auth.middleware.js";

export const productRouter = Router();

productRouter.get("/", verifyToken, getAllProducts);

productRouter.get("/:id",verifyToken, getProductById);

productRouter.post("/",verifyToken, validateSchema(productSchema), createProduct);

productRouter.put("/:id",verifyToken, validateSchema(productSchema), updateProduct);

productRouter.delete("/:id",verifyToken, deleteProduct);
