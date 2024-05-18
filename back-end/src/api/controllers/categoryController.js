import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar uma nova categoria
export const createCategory = async (req, res) => {
    try {
        const { nome } = req.body;
        const categoria = await prisma.categoria.create({
            data: { nome },
        });
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obter todas as categorias
export const getCategories = async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obter uma categoria por ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await prisma.categoria.findUnique({
            where: { id: parseInt(id) },
        });
        if (!categoria) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Atualizar uma categoria
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        const categoria = await prisma.categoria.update({
            where: { id: parseInt(id) },
            data: { nome },
        });
        res.status(200).json(categoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar uma categoria
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.categoria.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
