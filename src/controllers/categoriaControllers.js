const db = require("../models");
const Categoria = db.getModel("Categoria");

class CategoriaController {
  async createCategoria(req, res) {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).send({ message: "El nombre de la categoría es obligatorio." });
    }

    try {
      const existente = await Categoria.findOne({ where: { nombre } });
      if (existente) {
        return res.status(400).send({ message: "La categoría ya existe." });
      }

      const nuevaCategoria = await Categoria.create({ nombre });
      res.status(201).send({
        message: "La categoría se ha creado exitosamente.",
        categoria: nuevaCategoria,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "ocurrio un error al crear la categoría." });
    }
  }

  async getCategorias(req, res) {
    try {
      const categorias = await Categoria.findAll();
      res.send(categorias);
    } catch (err) {
      res.status(500).send({ message: "ocurrio un error al obtener las categorías." });
    }
  }

  async getCategoriaById(req, res) {
    const { id } = req.params;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).send({ message: "La categoría no fue encontrada." });
      }

      res.send(categoria);
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al obtener la categoría." });
    }
  }

  async updateCategoria(req, res) {

    const { id } = req.params;
    const { nombre } = req.body;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).send({ message: "La categoría no fue encontrada." });
      }

      if (nombre) {
        const existeNombre = await Categoria.findOne({ where: { nombre } });
        if (existeNombre && existeNombre.id !== parseInt(id)) {
          return res.status(400).send({ message: "Ya existe una categoría con ese nombre." });
        }
        categoria.nombre = nombre;
      }

      await categoria.save();

      res.send({
        message: "El nombre de la categoría se ha actualizado correctamente.",
        categoria,
      });
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al actualizar la categoría." });
    }
  }

  async deleteCategoria(req, res) {

    const { id } = req.params;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).send({ message: "La categoría no fue encontrada." });
      }

      await categoria.destroy();

      res.send({ message: "La Categoría fue eliminada exitosamente." });
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al eliminar la categoría." });
    }
  }
}

module.exports = CategoriaController;
