const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany } = require("./_index");
const Departamento = require("./departamento.model");
const Area = require("./area.model.js");
const Empresa = require("./empresa.model.js");

const Cargo = sequelize.define(
  "cargo",
  {
    idCargo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    salario: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    capacitacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duracionCapacitacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    resumen: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    poligrafia: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    visita: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    responsabilidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // id_departamento fk
    // id_area fk
    // id_empresa fk
  },
  {
    tableName: "cargo",
    indexes: [
      {
        unique: true,
        fields: ["idCargo"],
      },
    ],
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: Departamento,
  ToMany: Cargo,
  foreignKey: "id_departamento",
});

relationOneToMany({
  One: Area,
  ToMany: Cargo,
  foreignKey: "id_area",
});

relationOneToMany({
  One: Empresa,
  ToMany: Cargo,
  foreignKey: "id_empresa",
});

module.exports = Cargo;
