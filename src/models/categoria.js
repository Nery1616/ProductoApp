const { Model, DataTypes } = require('sequelize');

class Categoria extends Model {
  get Nombre() {
    return this.nombre;
  }

  set Nombre(valor) {
    this.nombre = valor;
  }
}

module.exports = (sequelize) => {
  Categoria.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'categoria',
      tableName: 'categorias',
      timestamps: false,
    }
  );
  return Categoria;
};
