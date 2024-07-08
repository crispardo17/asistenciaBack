const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");

const TipoNotificacion = sequelize.define(
  "tipoNotificacion",
  {
    idTipoNotificacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    strCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "tipoNotificacion",
    indexes: [
      {
        unique: true,
        fields: ["idTipoNotificacion"],
      },
    ],
    schema: config.schemaOne,
  }
);

module.exports = TipoNotificacion;
