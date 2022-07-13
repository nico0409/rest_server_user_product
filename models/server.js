const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/auth/local/register";
    this.authPath = "/api/auth";
    this.userme = "/users";
    this.addresses = "/addresses";
    this.platforms = "/platforms";
    this.games = "/games";
    this.favorites = "/favorites";
    this.orders = "/orders";

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.userme, require("../routes/usuarios"));
    this.app.use(this.addresses, require("../routes/addresses"));
    this.app.use(this.platforms, require("../routes/platforms"));
    this.app.use(this.games, require("../routes/games.js"));
    this.app.use(this.favorites, require("../routes/favorites"));
    this.app.use(this.orders, require("../routes/orders"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
