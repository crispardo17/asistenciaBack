const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");

const TipoEstado = sequelize.define(
  "tipoEstado",
  {
    idTipoEstado: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    strCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "tipoEstado",
    indexes: [
      {
        unique: true,
        fields: ["idTipoEstado"],
      },
    ],
    schema: config.schemaOne,
  }
);

module.exports = TipoEstado;
