const express = require('express');
const cors = require('cors');
const path = require('path');
const { APP_PORT, FRONTEND_URL } = require('./src/config/config.js');
const db = require('./src/models/index.js'); 
const { swaggerUi, swaggerSpec } = require('./swagger');

//const scalarExpressApiReference = require('@scalar/express-api-reference');

const RouteCategoria = require('./src/routes/categoriaRoutes.js');
const RouteProducto = require('./src/routes/productoRoutes.js');
const RouteMarca = require('./src/routes/marcaRoutes.js');
const RouteColor = require('./src/routes/colorRoutes.js');
const RouteProductoTallaColor = require('./src/routes/productoTallaColorRoutes.js');
const RouteProductoColor = require('./src/routes/productoColorRoutes.js');
const RouteTalla = require('./src/routes/tallaRoutes.js');

class Server {
  constructor() {
    this.app = express();
    this.port = APP_PORT;

    // Middlewares principales
    this.app.use(express.json()); 
    this.app.use(express.urlencoded({ extended: true })); 
    this.configureMiddlewares();
    this.configureRoutes();
    this.connectDatabase();
  }

  configureMiddlewares() {
    this.app.use(cors({
      origin: FRONTEND_URL,
      credentials: true 
    }));

    // Carpeta para servir imágenes
    this.app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  }

  configureRoutes() {
    new RouteTalla(this.app);
    new RouteMarca(this.app);
    new RouteCategoria(this.app);
    new RouteProducto(this.app);
    new RouteColor(this.app);
    new RouteProductoTallaColor(this.app);
    new RouteProductoColor(this.app);

    // Documentación Swagger
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   /*   // Documentación Scalar
  this.app.use('/docs', scalarExpressApiReference({
    title: 'Documentación de ProductoApp',
    version: '1.0.0',
  }));*/
}

  async connectDatabase() {
    try {
      await db.sequelize.sync({ alter: true }); 
      console.log('Base de datos conectada y sincronizada.');

      /*const tables = await db.sequelize.getQueryInterface().showAllTables();
      console.log('Tablas en la base de datos:', tables);*/
    } catch (error) {
      console.error('Ocurrio un error al conectar con la base de datos:', error);
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
