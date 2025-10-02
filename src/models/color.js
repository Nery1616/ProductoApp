const { Model, DataTypes } = require('sequelize');

class Color extends Model {
  get Nombre() {
    return this.nombre;
  }

  set Nombre(valor) {
    this.nombre = valor;
  }

  get CodigoHex() {
    return this.codigoHex;
  }

  set CodigoHex(valor) {
    this.codigoHex = valor;
  }
}

module.exports = (sequelize) => {
  Color.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      codigoHex: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'color',
      tableName: 'colores',
      timestamps: false,
    }
  );
  return Color;
};
