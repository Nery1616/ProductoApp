const db = require("../models");
const Producto = db.getModel("Producto");
const Marca = db.getModel("Marca");
const Categoria = db.getModel("Categoria");
const ProductoColor = db.getModel("ProductoColor");
const ProductoTallaColor = db.getModel("ProductoTallaColor");
const Talla = db.getModel("Talla");
const Color = db.getModel("Color");

class ProductoController {
  async createProducto(req, res) {
    const { nombre, descripcion, precio, marcaId, categoriaId } = req.body;

    if (!nombre || !descripcion || precio === undefined || !marcaId || !categoriaId) {
      return res.status(400).send({ message: "Todos los campos son obligatorios (incluyendo marcaId y categoriaId)." });
    }

    if (precio <= 0 ) { 
      return res.status(400).send({ message: "Las dimensiones y el precio deben ser mayores a cero." });
    }

    try {
      const marca = await Marca.findByPk(marcaId);
      if (!marca) return res.status(400).send({ message: "La marca que se ingreso no existe." });

      const categoria = await Categoria.findByPk(categoriaId);
      if (!categoria) return res.status(400).send({ message: "La categoría que se ingreso no existe." });

      const existente = await Producto.findOne({ where: { nombre } });
      if (existente) return res.status(400).send({ message: "El producto ingresado ya existe." });

      const nuevoProducto = await Producto.create({
        nombre,
        descripcion,
        precio,
        marcaId,
        categoriaId
      });

      res.status(201).send({
        message: "Producto fue creado exitosamente.",
        producto: nuevoProducto
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message || "Hubo un error al crear el producto." });
    }
  }

  async getProductos(req, res) {
    try {
      const { categoria, page = 1, limit = 10 } = req.query;

      const pageInt = parseInt(page, 10);
      const limitInt = parseInt(limit, 10);

      if (isNaN(pageInt) || pageInt < 1) {
        return res.status(400).send({ message: "El parámetro 'page' debe ser un número entero mayor o igual a 1." });
      }

      if (isNaN(limitInt) || limitInt < 1) {
        return res.status(400).send({ message: "El parámetro 'limit' debe ser un número entero mayor o igual a 1." });
      }

      const whereCategoria = categoria ? { nombre: categoria } : undefined;

      const offset = (pageInt - 1) * limitInt;

      // Para obtener total de productos con filtro de categoría, hacemos un count
      const totalProductos = await Producto.count({
        include: [{
          model: Categoria,
          as: "categoria",
          where: whereCategoria,
          required: !!categoria
        }]
      });

      const productos = await Producto.findAll({
        include: [
          { model: Marca, as: "marca", attributes: ["nombre"] },
          {
            model: Categoria,
            as: "categoria",
            attributes: ["nombre"],
            where: whereCategoria,
            required: !!categoria
          },
          {
            model: ProductoColor,
            as: "productoColores",
            attributes: ["id", "imagenUrl"],
            include: [
              { model: Color, as: "colorInfo", attributes: ["codigoHex"] },
              {
                model: ProductoTallaColor,
                as: "tallasColores",
                include: [{ model: Talla, as: "tallaInfo", attributes: ["valor"] }]
              }
            ]
          }
        ],
        offset,
        limit: limitInt,
      });

      res.status(200).send({
        message: "Productos obtenidos exitosamente.",
        total: totalProductos,
        page: pageInt,
        limit: limitInt,
        productos: productos.map((p) => ({
          id: p.id,
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          marca: { nombre: p.marca?.nombre || null },
          categoria: { nombre: p.categoria?.nombre || null },
          colores: p.productoColores.map((pc) => ({
            id: pc.id,
            imagenUrl: pc.imagenUrl,
            codigoHex: pc.colorInfo?.codigoHex || null,
            tallas: pc.tallasColores.map((tc) => ({
              id: tc.id,
              valor: tc.tallaInfo?.valor || null,
              stock: tc.stock
            }))
          }))
        }))
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Hubo un error al obtener los productos." });
    }
  }

  async getProductoById(req, res) {
    const id = req.params.id;
    try {
      const producto = await Producto.findByPk(id, {
        include: [
          { model: Marca, as: "marca", attributes: ["nombre"] },
          { model: Categoria, as: "categoria", attributes: ["nombre"] },
          {
            model: ProductoColor,
            as: "productoColores",
            attributes: ["id", "imagenUrl"],
            include: [
              {
                model: Color,
                as: "colorInfo",
                attributes: ["codigoHex"]
              },
              {
                model: ProductoTallaColor,
                as: "tallasColores",
                include: [
                  { model: Talla, as: "tallaInfo", attributes: ["valor"] }
                ]
              }
            ]
          }
        ]
      });

      if (!producto) {
        return res.status(404).send({ message: "El producto no fue encontrado." });
      }

      res.status(200).send(producto);
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al obtener el producto." });
    }
  }

  async updateProducto(req, res) {
    const id = req.params.id;
    const { nombre, descripcion, precio, marcaId, categoriaId} = req.body;

    try {
      const producto = await Producto.findByPk(id);
      if (!producto) return res.status(404).send({ message: "El producto no pudo ser encontrado." });

      if (nombre && nombre !== producto.nombre) {
        const existente = await Producto.findOne({ where: { nombre } });
        if (existente) return res.status(400).send({ message: "Ya existe un producto con ese nombre." });
        producto.nombre = nombre;
      }

      if (descripcion !== undefined) producto.descripcion = descripcion;
      if (precio !== undefined) producto.precio = precio;

      if (marcaId !== undefined) {
        const marca = await Marca.findByPk(marcaId);
        if (!marca) return res.status(400).send({ message: "La marca que se ingreso no existe." });
        producto.marcaId = marcaId;
      }

      if (categoriaId !== undefined) {
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) return res.status(400).send({ message: "La categoría ingresada no existe." });
        producto.categoriaId = categoriaId;
      }

      await producto.save();

      res.send({
        message: "El producto fue actualizado.",
        producto
      });
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al actualizar el producto." });
    }
  }

  async deleteProducto(req, res) {
    const id = req.params.id;

    try {
      const deleted = await Producto.destroy({ where: { id } });
      if (deleted === 1) {
        res.send({ message: "El producto fue eliminado exitosamente." });
      } else {
        res.status(404).send({ message: "El producto no fue encontrado." });
      }
    } catch (err) {
      res.status(500).send({ message: "Hubo un error al eliminar el producto." });
    }
  }
}

module.exports = ProductoController;
