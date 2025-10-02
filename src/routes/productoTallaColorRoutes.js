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
    this.router.post("/", this.controller.createProductoTalla.bind(this.controller));
    this.router.get("/", this.controller.getProductoTalla.bind(this.controller));
    this.router.get("/:id", this.controller.getProductoTallaById.bind(this.controller));
    this.router.put("/:id", this.controller.updateProductoTallaById.bind(this.controller));
    this.router.delete("/:id", this.controller.deleteProductoTallaById.bind(this.controller));
  }
}

module.exports = RouteProductoTallaColor;