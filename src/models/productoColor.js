const { Model, DataTypes } = require('sequelize');

class ProductoColor extends Model {
  get Color() {
    return this.color; 
  }
  set Color(v) {
    this.color = v;
  }

  get ImagenUrl() {
    return this.imagenUrl;
  }
  set ImagenUrl(url) {
    this.imagenUrl = url;
  }
}

module.exports = (sequelize) => {
  ProductoColor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'productos', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      imagenUrl: {
        type: DataTypes.STRING,
        validate: { isUrl: true }
      },
    },
    {
      sequelize,
      modelName: 'ProductoColor',
      tableName: 'producto_color',
      timestamps: false,
    }
  );

  ProductoColor.associate = (models) => {
    ProductoColor.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto',
    });
  };

  return ProductoColor;
};
