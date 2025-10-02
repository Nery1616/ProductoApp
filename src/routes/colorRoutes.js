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
    this.router.post("/", this.controller.createColor.bind(this.controller));

    // Obtener todos los colores
    this.router.get("/", this.controller.getColor.bind(this.controller));

    // Obtener un color por ID
    this.router.get("/:id", this.controller.getColorById.bind(this.controller));

    // Actualizar un color
    this.router.put("/:id", this.controller.updateColor.bind(this.controller));

    // Eliminar un color
    this.router.delete("/:id", this.controller.deleteColor.bind(this.controller))
  }
}

module.exports = RouteColor;
