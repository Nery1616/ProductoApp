const db = require("../models");
const ProductoTallaColor = db.getModel("ProductoTallaColor");
const ProductoColor = db.getModel("ProductoColor");
const Talla = db.getModel("Talla");
const Color = db.getModel("Color");
const Producto=db.getModel("Producto")

class ProductoTallaController {
    async createProductoTalla(req, res) {
        const { tallaId, productoColorId, stock } = req.body;

        if (!tallaId || !productoColorId || !stock) {
            return res.status(400).send({ 
                message: "Los campos tallaId, productoColorId y stock son obligatorios." 
            });
        }

        if (stock <= 0 || !Number.isInteger(stock)) {
            return res.status(400).send({ message: "El stock debe ser un número entero mayor a cero." });
        }

        try {
            const existe_producto_color = await ProductoColor.findOne({
                where: { id: productoColorId }
            });
            if (!existe_producto_color) {
                return res.status(400).send({
                    message: "No existe un producto color con el id asignado."
                });
            }

            const existe_talla = await Talla.findOne({
                where: { id: tallaId }
            });
            if (!existe_talla) {
                return res.status(400).send({
                    message: "No existe una talla con el id asignado."
                });
            }

            const existente = await ProductoTallaColor.findOne({ 
                where: { tallaId, productoColorId } 
            });
            if (existente) {
                return res.status(400).send({ 
                    message: "Ya existe una combinación de talla y color para este producto." 
                });
            }

            const nuevaTallaColor = await ProductoTallaColor.create({
                tallaId,
                productoColorId,
                stock
            });

            res.status(201).send({
                message: "La Talla y Color fue creada exitosamente.",
                tallaColor: nuevaTallaColor
            });
        } catch (err) {
            res.status(500).send({ message: err.message || "Hubo un error al crear la talla." });
        }
    }

    async getProductoTalla(req, res) {
        try {
            const tallas_color = await ProductoTallaColor.findAll({
                include: [
                    {
                        model: Talla,
                        as: 'tallaInfo',
                        attributes: ["valor"]
                    },
                    {
                        model: ProductoColor,
                        as: 'productoColor', 
                        attributes: ["id","imagenUrl"],
                        include: [
                            {
                                model: Color,
                                as: 'colorInfo',
                                attributes: ["codigoHex"]
                            }
                        ]
                    }
                ]
            });

            return res.status(200).send({
                message: "Producto Talla Color obtenidos exitosamente.",
                total: tallas_color.length,
                tallas_color: tallas_color.map(tc => ({
                    id: tc.id,
                    stock: tc.stock,
                    productoColorId: tc.productoColorId,
                    tallaId: tc.tallaId,
                    color: {
                        id: tc.productoColor?.id,
                        imagenUrl: tc.productoColor?.imagenUrl,
                        codigoHex: tc.productoColor?.colorInfo?.codigoHex || null
                    },
                    talla: tc.tallaInfo?.valor || null
                }))
            });
                
        } catch (err) {
            res.status(500).send({ message: err.message || "Hubo un error al obtener las tallas." });
        }
    }

    async getProductoTallaById(req, res) {
        const id = req.params.id;
        try {
            const tallaColor = await ProductoTallaColor.findByPk(id, {
                include: [
                    {
                        model: Talla,
                        as: 'tallaInfo',
                        attributes: ["valor"]
                    },
                    {
                        model: ProductoColor,
                        as: 'productoColor',
                        attributes: ["id", "imagenUrl"],
                        include: [
                            {
                                model: Color,
                                as: 'colorInfo',
                                attributes: ["codigoHex"]
                            },
                            {
                                model:Producto,
                                as: 'producto',
                                attributes: ["precio","nombre"]
                            }
                        ]
                    }
                ]
            });

            if (!tallaColor) {
                return res.status(404).send({ message: "La Talla Color no fue encontrada." });
            }
            res.send(tallaColor);
        } catch (err) {
            res.status(500).send({ message: "Hubo un error al obtener la talla color." });
        }
    }

    async updateProductoTallaById(req, res) {
        const id = req.params.id;
        const { stock } = req.body;

        try {
            const tallaObj = await ProductoTallaColor.findByPk(id);
            if (!tallaObj) {
                return res.status(404).send({ message: "La Talla Color no fue encontrada." });
            }

            if (stock !== undefined) {
                tallaObj.stock = stock;
            }

            await tallaObj.save();

            res.send({
                message: "Talla Color fue actualizada.",
                tallaColor: tallaObj
            });
        } catch (err) {
            res.status(500).send({ message: "Hubo un error al actualizar la talla color." });
        }
    }

    async deleteProductoTallaById(req, res) {
        const id = req.params.id;

        try {
            const deleted = await ProductoTallaColor.destroy({ where: { id } });

            if (deleted === 1) {
                res.send({ message: "La Talla Color fue eliminada exitosamente." });
            } else {
                res.status(404).send({ message: "La talla Color no fue encontrada." });
            }
        } catch (err) {
            res.status(500).send({ message: "Hubo un error al eliminar la talla color." });
        }
    }
}

module.exports = ProductoTallaController;
