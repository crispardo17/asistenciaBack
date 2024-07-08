const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany } = require("./_index.js");
const TipoEstado = require("./tipoEstado.model.js");

const Estado = sequelize.define(
  "estado",
  {
    idEstado: {
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
    // id_tipoEstado √
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "estado",
    indexes: [
      {
        unique: true,
        fields: ["idEstado"],
      },
    ],
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: TipoEstado,
  ToMany: Estado,
  foreignKey: "id_tipoEstado",
});

module.exports = Estado;
