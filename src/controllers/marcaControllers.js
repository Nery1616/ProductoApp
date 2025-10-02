const db = require("../models");
const Marca = db.getModel("Marca");

class MarcaController {
  async createMarca(req, res) {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).send({ message: "El nombre de la marca es obligatorio." });
    }

    try {
      const existente = await Marca.findOne({ where: { nombre } });
      if (existente) {
        return res.status(400).send({ message: "El nombre de la marca ya existe." });
      }

      const nuevaMarca = await Marca.create({ nombre });
      res.status(201).send({
        message: "El nombre de la marca fue creada exitosamente.",
        marca: nuevaMarca,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Hubo un error al crear la marca." });
    }
  }

  async getMarca(req, res) {


    try {
      const marcas = await Marca.findAll();
      res.send(marcas);
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al obtener las marcas." });
    }
  }

  async getMarcaById(req, res) {
    const { id } = req.params;

    try {
      const marca = await Marca.findByPk(id);
      if (!marca) {
        return res.status(404).send({ message: "La marca no pudo ser encontrada." });
      }

      res.send(marca);
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al obtener la marca." });
    }
  }

  async updateMarca(req, res) {
    const { id } = req.params;
    const { nombre } = req.body;

    if (nombre && nombre.trim() === "") {
        return res.status(400).send({ message: "El nombre no puede estar vacío." });
    }

    try {
      const marca = await Marca.findByPk(id);
      if (!marca) {
        return res.status(404).send({ message: "La marca no fue encontrada." });
      }

      if (nombre) {
        const existeNombre = await Marca.findOne({ where: { nombre } });
        if (existeNombre && existeNombre.id !== parseInt(id)) {
          return res.status(400).send({ message: "Ya existe otra marca con ese nombre." });
        }
        marca.nombre = nombre;
      }

      await marca.save();

      res.send({
        message: "El nombre de la marca fue actualizada correctamente.",
        marca,
      });
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al actualizar la marca." });
    }
  }

  async deleteMarca(req, res) {

    const { id } = req.params;

    try {
      const marca = await Marca.findByPk(id);
      if (!marca) {
        return res.status(404).send({ message: "La marca no fue encontrada." });
      }

      await marca.destroy();

      res.send({ message: "La marca fue eliminada exitosamente." });
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al eliminar la marca." });
    }
  }
}

module.exports = MarcaController;
