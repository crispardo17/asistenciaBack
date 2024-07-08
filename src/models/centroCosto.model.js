const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany } = require("./_index.js");
const Empresa = require("./empresa.model.js");

const CentroCosto = sequelize.define(
  "centroCosto",
  {
    idCentroCosto: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    //id_empresa √
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "centroCosto",
    indexes: [
      {
        unique: true,
        fields: ["idCentroCosto"],
      },
    ],
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: Empresa,
  ToMany: CentroCosto,
  foreignKey: "id_empresa",
});

module.exports = CentroCosto;
