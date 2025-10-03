const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProductoApp API',
      version: '1.0.0',
      description: 'Documentación de la API de productos',
    },
  },
  apis: ['./src/routes/*.js'], // Ajusta si tus rutas están en otro lugar
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };