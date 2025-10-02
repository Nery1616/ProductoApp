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
    this.router.post("/", this.controller.createProducto.bind(this.controller));

    // Obtener todos los productos
    this.router.get("/", this.controller.getProductos.bind(this.controller));

    // Obtener un producto por ID
    this.router.get("/:id", this.controller.getProductoById.bind(this.controller));

    // Actualizar un producto
    this.router.put("/:id", this.controller.updateProductoById.bind(this.controller));

    // Eliminar un producto
    this.router.delete("/:id", this.controller.deleteProductoById.bind(this.controller));
  }
}

module.exports = RouteProducto;
