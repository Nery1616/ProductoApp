const { Model, DataTypes } = require('sequelize');

class Marca extends Model {
  get Nombre() {
    return this.nombre;
  }

  set Nombre(valor) {
    this.nombre = valor;
  }
}

module.exports = (sequelize) => {
  Marca.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'marca',
      tableName: 'marcas',
      timestamps: false,
    }
  );
  return Marca;
};
