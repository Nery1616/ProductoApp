const { Model, DataTypes } = require('sequelize');

class Talla extends Model {
}

module.exports = (sequelize) => {
  Talla.init(
    {
      valor: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'talla',
      tableName: 'tallas',
      timestamps: false,
    }
  );
  return Talla;
};
