const express = require('express');
const CategoriaController = require('../controllers/categoriaControllers.js');

class RouteCategoria {
  constructor(app) {
    this.router = express.Router();
    this.controller = new CategoriaController();
    this.registerRoutes();
    app.use("/api/categoria", this.router);
  }

  registerRoutes() {
    // Crear una nueva categoría
     /**
   * @swagger
   * /api/categoria:
   *   post:
   *     summary: Crear una nueva categoría
   *     tags: [Categorías]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *     responses:
   *       201:
   *         description: Categoría creada exitosamente
   */

    this.router.post("/", this.controller.createCategoria.bind(this.controller));
    // Obtener todas las categorías
    /**
   * @swagger
   * /api/categoria:
   *   get:
   *     summary: Obtener todas las categorías
   *     tags: [Categorías]
   *     responses:
   *       200:
   *         description: Lista de categorías
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   nombre:
   *                     type: string
   */

    this.router.get("/", this.controller.getCategorias.bind(this.controller));
    // Obtener una categoría por ID
    /**
   * @swagger
   * /api/categoria/{id}:
   *   get:
   *     summary: Obtener una categoría por ID
   *     tags: [Categorías]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Categoría encontrada
   *       404:
   *         description: Categoría no encontrada
   */

    this.router.get("/:id", this.controller.getCategoriaById.bind(this.controller));
    // Actualizar una categoría
    /**
   * @swagger
   * /api/categoria/{id}:
   *   put:
   *     summary: Actualizar una categoría por ID
   *     tags: [Categorías]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *     responses:
   *       200:
   *         description: Categoría actualizada
   *       404:
   *         description: Categoría no encontrada
   */

    this.router.put("/:id", this.controller.updateCategoriaById.bind(this.controller));
    // Eliminar una categoría
    /**
   * @swagger
   * /api/categoria/{id}:
   *   delete:
   *     summary: Eliminar una categoría por ID
   *     tags: [Categorías]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Categoría eliminada
   *       404:
   *         description: Categoría no encontrada
   */

    this.router.delete("/:id", this.controller.deleteCategoriaById.bind(this.controller));
  }
}

module.exports = RouteCategoria;
