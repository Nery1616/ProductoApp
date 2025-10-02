const db = require("../models");
const ProductoColor = db.getModel("ProductoColor");

class ProductoColorController {
  async createProductoColor(req, res) {
    const { colorId, productoId } = req.body;
    const imagenUrl = req.body.imagenUrl;
    if (!colorId || !productoId) {
      return res.status(400).send({ message: "colorId y productoId son obligatorios." });
    }

    if (imagenUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(imagenUrl)) {
      return res.status(400).send({ message: "La URL de la imagen no es válida." });
    }

    try {
      const existente = await ProductoColor.findOne({
        where: { colorId, productoId }
      });

      if (existente) {
        return res.status(400).send({ message: "Ese producto ya tiene ese color." });
      }

      const nuevoColor = await ProductoColor.create({
        colorId,
        productoId,
        imagenUrl
      });

      res.status(201).send({
        message: "Color de producto creado exitosamente.",
        data: nuevoColor
      });
    } catch (err) {
      console.error("Error: ", err)
      res.status(500).send({ message: err.message || "Error al crear el color de producto." });
    }
  }

  async getProductoColores(req, res) {
    try {
      const colores = await ProductoColor.findAll({
        include: [
          {
            model: db.getModel("Color"),
            as: 'colorInfo',
            attributes: ["nombre"]
          },
          {
            model: db.getModel("Producto"),
            as: 'producto',
            attributes: ["nombre"]
          }
        ]
      });

      const resultado = colores.map(pc => ({
        id: pc.id,
        productoId: pc.productoId,
        colorId: pc.colorId,
        imagenUrl: pc.imagenUrl,
        nombreColor: pc.colorInfo?.nombre || null,
        nombreProducto: pc.producto?.nombre || null 
      }));

      res.send({
        success: true,
        data: resultado
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Hubo un error al obtener los colores." });
    }
  }

  async getProductoColorById(req, res) {
    const id = req.params.id;
    try {
      const color = await ProductoColor.findByPk(id, {
        include: [
          {
            model: db.getModel("Color"),
            as: 'colorInfo',
            attributes: ["nombre"]
          },
          {
            model: db.getModel("Producto"),
            as: 'producto',
            attributes: ["nombre"]
          }
        ]
      });

      if (!color) {
        return res.status(404).send({ message: "El color no fue encontrado." });
      }

      res.send({
        success: true,
        data: {
          id: color.id,
          productoId: color.productoId,
          colorId: color.colorId,
          imagenUrl: color.imagenUrl,
          nombreColor: color.colorInfo?.nombre || null,
          nombreProducto: color.producto?.nombre || null
        }
      });
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ message: "Hubo un error al obtener el color." });
    }
  }

  async updateProductoColorById(req, res) {
    const id = req.params.id;
    const imagenUrl = req.body.imagenUrl;

    try {
      const pc = await ProductoColor.findByPk(id);
      if (!pc) {
        return res.status(404).send({ message: "ProductoColor no encontrado." });
      }

      if (imagenUrl !== undefined) {
        pc.imagenUrl = imagenUrl;
      }

      await pc.save();

      res.send({
        message: "ProductoColor actualizado.",
        data: pc
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Hubo un error al actualizar ProductoColor." });
    }
  }


  async deleteProductoColorById(req, res) {
    const id = req.params.id;

    try {
      const deleted = await ProductoColor.destroy({ where: { id } });

      if (deleted === 1) {
        res.send({ message: "El color fue eliminado exitosamente." });
      } else {
        res.status(404).send({ message: "El color no pudo ser encontrado." });
      }
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al eliminar el color." });
    }
  }
}

module.exports = ProductoColorController;
