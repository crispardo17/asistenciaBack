const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");

const Departamento = sequelize.define(
  "departamento",
  {
    idDepartamento: {
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
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "departamento",
    indexes: [
      {
        unique: true,
        fields: ["idDepartamento"],
      },
    ],
    schema: config.schemaOne,
  }
);

module.exports = Departamento;
