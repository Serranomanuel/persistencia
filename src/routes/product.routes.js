import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/autenticacion.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { productSchema } from "../schemas/product.schema.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProductById);

productRouter.post("/", validateSchema(productSchema), createProduct);

productRouter.put("/:id", validateSchema(productSchema), updateProduct);

productRouter.delete("/:id", protect, deleteProduct);

export default productRouter;
