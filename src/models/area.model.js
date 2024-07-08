const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany } = require("./_index");
const CentroCosto = require("./centroCosto.model.js");
const Departamento = require("./departamento.model");

const Area = sequelize.define(
  "area",
  {
    idArea: {
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
      defaultValue: true,
    },
    // id_departamento fk
    // id_centroCosto fk
  },
  {
    timestamps: true,
    tableName: "area",
    indexes: [
      {
        unique: true,
        fields: ["idArea"],
      },
    ],
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: Departamento,
  ToMany: Area,
  foreignKey: "id_departamento",
});

relationOneToMany({
  One: CentroCosto,
  ToMany: Area,
  foreignKey: "id_centroCosto",
});

module.exports = Area;
