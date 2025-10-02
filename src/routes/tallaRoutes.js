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
        this.router.post("/",(req,res)=>{
            try{
                this.controller.createTalla(req,res);
            }catch(err){
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        this.router.get("/:id",(req,res)=>{
            try{
                this.controller.getTallaById(req,res);
            }catch(err){
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        this.router.get("/",(req,res)=>{
            try{
                this.controller.getTallas(req,res);
            }catch(err){
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        this.router.put("/:id",(req,res)=>{
            try{
                this.controller.updateTallaById(req,res);
            }catch(err){
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
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