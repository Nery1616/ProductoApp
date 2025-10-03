const express = require('express');
const ColorController = require('../controllers/colorControllers.js');

class RouteColor {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ColorController();
    this.registerRoutes();
    app.use("/api/color", this.router);
  }

  registerRoutes() {
    // Crear un nuevo color
    /**
   * @swagger
   * /api/color:
   *   post:
   *     summary: Crear un nuevo color
   *     tags: [Colores]
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
   *         description: Color creado exitosamente
   */

    this.router.post("/", this.controller.createColor.bind(this.controller));

    // Obtener todos los colores
    /**
   * @swagger
   * /api/color:
   *   get:
   *     summary: Obtener todos los colores
   *     tags: [Colores]
   *     responses:
   *       200:
   *         description: Lista de colores
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

    this.router.get("/", this.controller.getColor.bind(this.controller));

    // Obtener un color por ID
    /**
   * @swagger
   * /api/color/{id}:
   *   get:
   *     summary: Obtener un color por ID
   *     tags: [Colores]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Color encontrado
   *       404:
   *         description: Color no encontrado
   */

    this.router.get("/:id", this.controller.getColorById.bind(this.controller));

    // Actualizar un color
    /**
   * @swagger
   * /api/color/{id}:
   *   put:
   *     summary: Actualizar un color por ID
   *     tags: [Colores]
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
   *         description: Color actualizado
   *       404:
   *         description: Color no encontrado
   */

    this.router.put("/:id", this.controller.updateColorById.bind(this.controller));

    // Eliminar un color
    /**
   * @swagger
   * /api/color/{id}:
   *   delete:
   *     summary: Eliminar un color por ID
   *     tags: [Colores]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Color eliminado
   *       404:
   *         description: Color no encontrado
   */

    this.router.delete("/:id", this.controller.deleteColorById.bind(this.controller))
  }
}

module.exports = RouteColor;
