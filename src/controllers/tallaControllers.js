const db = require("../models");
const Talla = db.getModel("Talla");

class TallaController {
  async createTalla(req, res) {
    const { valor } = req.body;

    if (!valor) {
      return res.status(400).send({ message: "El valor de la talla es obligatorio." });
    }

    if (!/^[XSML]{1,3}$/.test(valor)) {
      return res.status(400).send({ message: "El valor de la talla no tiene un formato válido." });
    }

    try {
      const existente = await Talla.findOne({ where: { valor } });
      if (existente) {
        return res.status(400).send({ message: "La talla ingresada ya existe." });
      }

      const nuevaTalla = await Talla.create({ valor });
      res.status(201).send({
        message: "La talla fue creada exitosamente.",
        talla: nuevaTalla,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Hubo un error al crear la talla." });
    }
  }

  async getTallas(req, res) {
    try {
      const tallas = await Talla.findAll();
      res.send(tallas);
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al obtener las tallas." });
    }
  }

  async getTallaById(req, res) {
    const { id } = req.params;

    try {
      const talla = await Talla.findByPk(id);
      if (!talla) {
        return res.status(404).send({ message: "La talla no fue encontrada." });
      }

      res.send(talla);
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al obtener la talla." });
    }
  }

  async updateTalla(req, res) {

    const { id } = req.params;
    const { valor } = req.body;

    try {
      const talla = await Talla.findByPk(id);
      if (!talla) {
        return res.status(404).send({ message: "La talla no fue encontrada." });
      }

      if (valor) {
        const existeValor = await Talla.findOne({ where: { valor } });
        if (existeValor && existeValor.id !== parseInt(id)) {
          return res.status(400).send({ message: "Ya existe una talla con ese valor." });
        }
        talla.valor = valor;
      }

      await talla.save();

      res.send({
        message: "La talla fue actualizada correctamente.",
        talla,
      });
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al actualizar la talla." });
    }
  }

  async deleteTalla(req, res) {
    const { id } = req.params;

    try {
      const talla = await Talla.findByPk(id);
      if (!talla) {
        return res.status(404).send({ message: "La talla no fue encontrada." });
      }

      await talla.destroy();

      res.send({ message: "La talla fue eliminada exitosamente." });
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al eliminar la talla." });
    }
  }
}

module.exports = TallaController;
