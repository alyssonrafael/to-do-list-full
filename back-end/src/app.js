import express from "express";
import cors from "cors";
import taskRoutes from "./routers/taskRouters.js";
import categoryRoutes from "./routers/categoryRoutes.js";

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: "http://localhost:5173", // Endereço do seu frontend
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api", categoryRoutes);

export default app;
