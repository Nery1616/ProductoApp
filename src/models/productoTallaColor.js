const { Model, DataTypes } = require('sequelize');

class ProductoTallaColor extends Model {
}

module.exports = (sequelize) => {
  ProductoTallaColor.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true
    },
    tallaId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'tallas',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    productoColorId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'producto_color',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 }
    },
  }, 
  {
    sequelize,
    modelName: 'productoTallaColor',
    tableName: 'producto_talla_color',
    timestamps: false,
  });
  return ProductoTallaColor;
};