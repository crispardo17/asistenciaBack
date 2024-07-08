const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");

const Empresa = sequelize.define(
  "empresa",
  {
    idEmpresa: {
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
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "empresa",
    indexes: [
      {
        unique: true,
        fields: ["idEmpresa"],
      },
    ],
    schema: config.schemaOne,
  }
);

module.exports = Empresa;
