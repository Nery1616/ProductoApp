const db = require("../models");
const Color = db.getModel("Color");

class ColorController {
  async createColor(req, res) {
    const { nombre, codigoHex } = req.body;

    if (!nombre) {
      return res.status(400).send({ message: "El nombre del color es obligatorio." });
    }

    if (codigoHex && !/^#[0-9A-F]{6}$/i.test(codigoHex)) {
        return res.status(400).send({ message: "El código HEX no es válido." });
    }

    try {
      const existente = await Color.findOne({ where: { nombre } });
      if (existente) {
        return res.status(400).send({ message: "El color ingresado ya existe." });
      }

      const nuevoColor = await Color.create({ nombre, codigoHex });
      res.status(201).send({
        message: "El color fue creado exitosamente.",
        color: nuevoColor,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Hubo un error al crear el color." });
    }
  }

  async getColor(req, res) {

    try {
      const colores = await Color.findAll();
      res.send(colores);
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al obtener los colores." });
    }
  }

  async getColorById(req, res) {
    const { id } = req.params;

    try {
      const color = await Color.findByPk(id);
      if (!color) {
        return res.status(404).send({ message: "El color no fue encontrado." });
      }

      res.send(color);
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al obtener el color." });
    }
  }

  async updateColor(req, res) {

    const { id } = req.params;
    const { nombre, codigoHex } = req.body;

    try {
      const color = await Color.findByPk(id);
      if (!color) {
        return res.status(404).send({ message: "El color no fue encontrado." });
      }

      if (nombre) {
        const existente = await Color.findOne({ where: { nombre } });
        if (existente && existente.id !== parseInt(id)) {
          return res.status(400).send({ message: "Ya existe otro color con ese nombre." });
        }
        color.nombre = nombre;
      }

      if (codigoHex !== undefined) {
        color.codigoHex = codigoHex;
      }

      await color.save();

      res.send({
        message: "El color fue actualizado correctamente.",
        color,
      });
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al actualizar el color." });
    }
  }

  async deleteColor(req, res) {
    const { id } = req.params;

    try {
      const color = await Color.findByPk(id);
      if (!color) {
        return res.status(404).send({ message: "El color no fue encontrado." });
      }

      await color.destroy();

      res.send({ message: "El color fue eliminado exitosamente." });
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al eliminar el color." });
    }
  }
}

module.exports = ColorController;
