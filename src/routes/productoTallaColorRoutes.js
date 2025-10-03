const express = require('express');
const ProductoTallaColorController = require('../controllers/productoTallaColorControllers.js');

class RouteProductoTallaColor {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ProductoTallaColorController();
    this.registerRoutes();
    app.use("/api/productoTalla", this.router);
  }

  registerRoutes() {
    /**
   * @swagger
   * /api/productoTallaColor:
   *   post:
   *     summary: Crear una relación producto-talla-color
   *     tags: [ProductoTallaColor]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               productoId:
   *                 type: integer
   *               tallaId:
   *                 type: integer
   *               colorId:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Relación creada exitosamente
   */

    this.router.post("/", this.controller.createProductoTalla.bind(this.controller));

    /**
   * @swagger
   * /api/productoTallaColor:
   *   get:
   *     summary: Obtener todas las relaciones producto-talla-color
   *     tags: [ProductoTallaColor]
   *     responses:
   *       200:
   *         description: Lista de relaciones
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   productoId:
   *                     type: integer
   *                   tallaId:
   *                     type: integer
   *                   colorId:
   *                     type: integer
   */

    this.router.get("/", this.controller.getProductoTalla.bind(this.controller));
/**
   * @swagger
   * /api/productoTallaColor/{id}:
   *   get:
   *     summary: Obtener una relación producto-talla-color por ID
   *     tags: [ProductoTallaColor]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Relación encontrada
   *       404:
   *         description: Relación no encontrada
   */

    this.router.get("/:id", this.controller.getProductoTallaById.bind(this.controller));
    /**
   * @swagger
   * /api/productoTallaColor/{id}:
   *   put:
   *     summary: Actualizar una relación producto-talla-color por ID
   *     tags: [ProductoTallaColor]
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
   *               productoId:
   *                 type: integer
   *               tallaId:
   *                 type: integer
   *               colorId:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Relación actualizada
   *       404:
   *         description: Relación no encontrada
   */
    this.router.put("/:id", this.controller.updateProductoTallaById.bind(this.controller));
    /**
   * @swagger
   * /api/productoTallaColor/{id}:
   *   delete:
   *     summary: Eliminar una relación producto-talla-color por ID
   *     tags: [ProductoTallaColor]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Relación eliminada
   *       404:
   *         description: Relación no encontrada
   */

    this.router.delete("/:id", this.controller.deleteProductoTallaById.bind(this.controller));
  }
}

module.exports = RouteProductoTallaColor;