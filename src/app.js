import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// Middlewares globales
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Rutas de la API
app.use("/api", router);

// IMPORTANTE: El middleware de errores siempre va al final
app.use(errorMiddleware);

export default app;