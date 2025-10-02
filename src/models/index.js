const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

class Database {
  constructor() {
    this._sequelize = new Sequelize(
      dbConfig.DB,
      dbConfig.USER,
      dbConfig.PASSWORD,
      {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        },
        logging: false
      }
    );

    this.Sequelize = Sequelize;
    this.models = {};

    this._loadModels();
    this._associateModels();
  }

  _loadModels() {
    const sequelize = this._sequelize;

    // Catálogos y productos
    this.models.Marca = require('./marca.js')(sequelize);
    this.models.Categoria = require('./categoria.js')(sequelize);
    this.models.Producto = require('./producto.js')(sequelize);
    this.models.Talla = require('./talla.js')(sequelize);
    this.models.Color = require('./color.js')(sequelize);
    this.models.ProductoColor = require('./productoColor.js')(sequelize);
    this.models.ProductoTallaColor = require('./productoTallaColor.js')(sequelize);
  }

  _associateModels() {
    const {
      Marca, Categoria, Producto, Talla, Color,
      ProductoColor, ProductoTallaColor
    } = this.models;

    // Producto ↔ Marca
    Producto.belongsTo(Marca, { foreignKey: 'marcaId', as: 'marca' });
    Marca.hasMany(Producto, { foreignKey: 'marcaId', as: 'productos' });

    // Producto ↔ Categoria
    Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
    Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });

    // Producto ↔ ProductoColor
    Producto.hasMany(ProductoColor, { foreignKey: 'productoId', as: 'productoColores' });
    ProductoColor.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });

    // Color ↔ ProductoColor
    Color.hasMany(ProductoColor, { foreignKey: 'colorId', as: 'productoColores' });
    ProductoColor.belongsTo(Color, { foreignKey: 'colorId', as: 'colorInfo' });

    // ProductoColor ↔ ProductoTallaColor
    ProductoColor.hasMany(ProductoTallaColor, { foreignKey: 'productoColorId', as: 'tallasColores' });
    ProductoTallaColor.belongsTo(ProductoColor, { foreignKey: 'productoColorId', as: 'productoColor' });

    // Talla ↔ ProductoTallaColor
    Talla.hasMany(ProductoTallaColor, { foreignKey: 'tallaId', as: 'productoTallas' });
    ProductoTallaColor.belongsTo(Talla, { foreignKey: 'tallaId', as: 'tallaInfo' });
  }

  get sequelize() {
    return this._sequelize;
  }

  getModel(name) {
    return this.models[name];
  }
}

module.exports = new Database();
