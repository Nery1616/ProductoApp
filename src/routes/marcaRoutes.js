const express = require('express');
const MarcaController = require('../controllers/marcaControllers.js');

class RouteMarca {
  constructor(app) {
    this.router = express.Router();
    this.controller = new MarcaController();
    this.registerRoutes();
    app.use("/api/marca", this.router);
  }

  registerRoutes() {
    // Crear una nueva marca
    /**
   * @swagger
   * /api/marca:
   *   post:
   *     summary: Crear una nueva marca
   *     tags: [Marcas]
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
   *         description: Marca creada exitosamente
   */

    this.router.post("/", this.controller.createMarca.bind(this.controller));

    // Obtener todas las marcas
    /**
   * @swagger
   * /api/marca:
   *   get:
   *     summary: Obtener todas las marcas
   *     tags: [Marcas]
   *     responses:
   *       200:
   *         description: Lista de marcas
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

    this.router.get("/", this.controller.getMarca.bind(this.controller));

    // Obtener marca por ID
    /**
   * @swagger
   * /api/marca/{id}:
   *   get:
   *     summary: Obtener una marca por ID
   *     tags: [Marcas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Marca encontrada
   *       404:
   *         description: Marca no encontrada
   */

    this.router.get("/:id", this.controller.getMarcaById.bind(this.controller));

    // Actualizar marca
    /**
   * @swagger
   * /api/marca/{id}:
   *   put:
   *     summary: Actualizar una marca por ID
   *     tags: [Marcas]
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
   *         description: Marca actualizada
   *       404:
   *         description: Marca no encontrada
   */

    this.router.put("/:id", this.controller.updateMarcaById.bind(this.controller));

    // Eliminar marca
    /**
   * @swagger
   * /api/marca/{id}:
   *   delete:
   *     summary: Eliminar una marca por ID
   *     tags: [Marcas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Marca eliminada
   *       404:
   *         description: Marca no encontrada
   */

    this.router.delete("/:id", this.controller.deleteMarcaById.bind(this.controller));
  }
}

module.exports = RouteMarca;
