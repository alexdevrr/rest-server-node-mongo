const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { connectDatabase } = require('../databases/config');

const cors = require('cors');
const definition = {
  swaggerDefiniton: {
    info: {
      title: 'Food API',
      description: 'Customer API information',
      version: '0.1.0',
      contact: {
        name: 'Amazing Developer',
      },
      servers: [
        { url: 'https://rest-food-app.herokuapp.com/' },
        { url: 'http://localhost:5000/' },
      ],
      // "basePath": "/api",
    },
  },
};

const options = {
  definition,
  // ['.routes/*.js']
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';
    this.ticketPath = '/api/ticket';

    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await connectDatabase();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.ticketPath, require('../routes/ticket'));
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(specs, { explorer: true })
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port);
    });
  }
}

module.exports = Server;
