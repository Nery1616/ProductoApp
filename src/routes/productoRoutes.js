const express = require('express');
const ProductoController = require('../controllers/productoControllers.js');

class RouteProducto {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ProductoController();
    this.registerRoutes();
    app.use("/api/producto", this.router);
  }

  registerRoutes() {
    // Crear un nuevo producto
    /**
   * @swagger
   * /api/producto:
   *   post:
   *     summary: Crear un nuevo producto
   *     tags: [Productos]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *               precio:
   *                 type: number
   *               categoriaId:
   *                 type: integer
   *               marcaId:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Producto creado exitosamente
   */

    this.router.post("/", this.controller.createProducto.bind(this.controller));

    // Obtener todos los productos
    /**
   * @swagger
   * /api/producto:
   *   get:
   *     summary: Obtener todos los productos
   *     tags: [Productos]
   *     responses:
   *       200:
   *         description: Lista de productos
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
   *                   precio:
   *                     type: number
   */

    this.router.get("/", this.controller.getProductos.bind(this.controller));

    // Obtener un producto por ID
      /**
   * @swagger
   * /api/producto/{id}:
   *   get:
   *     summary: Obtener un producto por ID
   *     tags: [Productos]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Producto encontrado
   *       404:
   *         description: Producto no encontrado
   */

    this.router.get("/:id", this.controller.getProductoById.bind(this.controller));

    // Actualizar un producto
    /**
   * @swagger
   * /api/producto/{id}:
   *   put:
   *     summary: Actualizar un producto por ID
   *     tags: [Productos]
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
   *               precio:
   *                 type: number
   *     responses:
   *       200:
   *         description: Producto actualizado
   *       404:
   *         description: Producto no encontrado
   */

    this.router.put("/:id", this.controller.updateProductoById.bind(this.controller));

    // Eliminar un producto
    /**
   * @swagger
   * /api/producto/{id}:
   *   delete:
   *     summary: Eliminar un producto por ID
   *     tags: [Productos]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Producto eliminado
   *       404:
   *         description: Producto no encontrado
   */

    this.router.delete("/:id", this.controller.deleteProductoById.bind(this.controller));
  }
}

module.exports = RouteProducto;
