const express = require("express");
const cloudinary = require("cloudinary").v2;  // Importa Cloudinary
const ProductoColorController = require("../controllers/productoColorControllers.js");
const {uploadSingle} = require("../middleware/Imagen.js");

// Configuración de Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class RouteProductoColor {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ProductoColorController();
    this.registerRoutes();
    app.use("/api/productoColor", this.router);
  }

  registerRoutes() {
    // Crear color con imagen
    /**
   * @swagger
   * /api/productoColor:
   *   post:
   *     summary: Crear relación producto-color con imagen
   *     tags: [ProductoColor]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               productoId:
   *                 type: integer
   *               colorId:
   *                 type: integer
   *               imagen:
   *                 type: string
   *                 format: binary
   *     responses:
   *       201:
   *         description: Relación creada con imagen
   *       400:
   *         description: Error al subir imagen
   *       500:
   *         description: Error interno
   */

    this.router.post("/", uploadSingle, async (req, res) => {
      try {
        let imagenUrl = null;
        if(req.fileValidationError){
          return res
            .status(400)
            .send({
              message: req.fileValidationError
            })
        }
        if (req.file) {
          // Usar el método upload_stream para subir el buffer de la imagen
          const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { 
                public_id: req.file.originalname.split('.')[0], 
                tags: 'producto_color' 
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );
            // Subir el archivo usando el buffer
            stream.end(req.file.buffer);
          });

          imagenUrl = uploadResult.secure_url; // Obtén la URL segura de la imagen
        }

        if (!imagenUrl) {
          return res.status(400).send({ message: "No se pudo guardar la imagen en Cloudinary" });
        }

        req.body.imagenUrl = imagenUrl;
        await this.controller.createProductoColor(req, res);
      } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Error al subir imagen a Cloudinary" });
      }
    });

    // Obtener todos los colores
    /**
   * @swagger
   * /api/productoColor:
   *   get:
   *     summary: Obtener todas las relaciones producto-color
   *     tags: [ProductoColor]
   *     responses:
   *       200:
   *         description: Lista de relaciones producto-color
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   productoId:
   *                     type: integer
   *                   colorId:
   *                     type: integer
   *                   imagenUrl:
   *                     type: string
   */

    this.router.get("/", (req, res) => {
      this.controller.getProductoColores(req, res);
    });

    // Obtener color por ID
      /**
   * @swagger
   * /api/productoColor/{id}:
   *   get:
   *     summary: Obtener una relación producto-color por ID
   *     tags: [ProductoColor]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Relación encontrada
   *       404:
   *         description: No encontrada
   */

    this.router.get("/:id", (req, res) => {
      this.controller.getProductoColorById(req, res);
    });

    // Actualizar color con nueva imagen
    /**
   * @swagger
   * /api/productoColor/{id}:
   *   put:
   *     summary: Actualizar relación producto-color con nueva imagen
   *     tags: [ProductoColor]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               productoId:
   *                 type: integer
   *               colorId:
   *                 type: integer
   *               imagen:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: Relación actualizada
   *       400:
   *         description: Error al subir imagen
   *       500:
   *         description: Error interno
   */

    this.router.put("/:id", uploadSingle, async (req, res) => {
      try {
        let imagenUrl = undefined;

        if (req.file) {
          // Usar el método upload_stream para subir el buffer de la imagen
          const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { 
                public_id: req.file.originalname.split('.')[0], 
                tags: 'producto_color' 
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );
            // Subir el archivo usando el buffer
            stream.end(req.file.buffer);
          });

          imagenUrl = uploadResult.secure_url;
        }

        req.body.imagenUrl = imagenUrl;
        await this.controller.updateProductoColorById(req, res);
      } catch (err) {
        console.error("Error al actualizar imagen en Cloudinary:", err.message);
        res.status(500).send({ message: "Error al actualizar imagen en Cloudinary" });
      }
    });

    // Eliminar color
    /**
   * @swagger
   * /api/productoColor/{id}:
   *   delete:
   *     summary: Eliminar una relación producto-color por ID
   *     tags: [ProductoColor]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Eliminada correctamente
   *       404:
   *         description: No encontrada
   */

    this.router.delete("/:id", (req, res) => {
      this.controller.deleteProductoColorById(req, res);
    });
  }
}

module.exports = RouteProductoColor;
