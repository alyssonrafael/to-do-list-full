import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../api/controllers/categoryController.js";

const router = express.Router();

// Rota para criar uma nova categoria
router.post("/categories", createCategory);

// Rota para obter todas as categorias
router.get("/categories", getCategories);

// Rota para obter uma categoria por ID
router.get("/categories/:id", getCategoryById);

// Rota para atualizar uma categoria
router.put("/categories/:id", updateCategory);

// Rota para deletar uma categoria
router.delete("/categories/:id", deleteCategory);

export default router;
