const express =require ('express');
const TallaController= require("../controllers/tallaControllers.js")

class RouteTalla{
    constructor(app){
        this.router=express.Router();
        this.controller=new TallaController();
        this.registerRoutes();
        app.use("/api/talla",this.router);
    }
    registerRoutes(){
        /**
   * @swagger
   * /api/talla:
   *   post:
   *     summary: Crear una nueva talla
   *     tags: [Tallas]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *     responses:
   *       201:
   *         description: Talla creada exitosamente
   */

        this.router.post("/",(req,res)=>{
            try{
                this.controller.createTalla(req,res);
            }catch(err){
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        /**
   * @swagger
   * /api/talla:
   *   get:
   *     summary: Obtener todas las tallas
   *     tags: [Tallas]
   *     responses:
   *       200:
   *         description: Lista de tallas
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   nombre:
   *                     type: string
   */

        this.router.get("/:id",(req,res)=>{
            try{
                this.controller.getTallaById(req,res);
            }catch(err){
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        /**
   * @swagger
   * /api/talla/{id}:
   *   get:
   *     summary: Obtener una talla por ID
   *     tags: [Tallas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Talla encontrada
   *       404:
   *         description: Talla no encontrada
   */

        this.router.get("/",(req,res)=>{
            try{
                this.controller.getTallas(req,res);
            }catch(err){
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        /**
   * @swagger
   * /api/talla/{id}:
   *   put:
   *     summary: Actualizar una talla por ID
   *     tags: [Tallas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *     responses:
   *       200:
   *         description: Talla actualizada
   *       404:
   *         description: Talla no encontrada
   */

        this.router.put("/:id",(req,res)=>{
            try{
                this.controller.updateTallaById(req,res);
            }catch(err){
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        /**
   * @swagger
   * /api/talla/{id}:
   *   delete:
   *     summary: Eliminar una talla por ID
   *     tags: [Tallas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Talla eliminada
   *       404:
   *         description: Talla no encontrada
   */

        this.router.delete("/:id",(req,res)=>{
            try{
                this.controller.deleteTallaById(req,res);
            }catch(err){
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
    }   
}
module.exports=RouteTalla;