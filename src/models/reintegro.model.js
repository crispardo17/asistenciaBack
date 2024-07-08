const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany } = require("./_index");
const Personal = require("./personal.model.js");
const Motivo = require("./motivo.model.js");
const Estado = require("./estado.model.js");
const Usuario = require("./usuario.model");

const Reintegro = sequelize.define(
  "reintegro",
  {
    idReintegro: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_personal √
    // id_motivo: √
    observacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // id_estadoReintegro √
    // id_usuarioReintegra √
  },
  {
    timestamps: true,
    tableName: "reintegro",
    indexes: [
      {
        unique: true,
        fields: ["idReintegro"],
      },
    ],
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: Personal,
  ToMany: Reintegro,
  foreignKey: "id_personal",
});

relationOneToMany({
  One: Motivo,
  ToMany: Reintegro,
  foreignKey: "id_motivo",
});

relationOneToMany({
  One: Estado,
  ToMany: Reintegro,
  foreignKey: "id_estadoReintegro",
});

relationOneToMany({
  One: Usuario,
  ToMany: Reintegro,
  foreignKey: "id_usuarioReintegra",
  as: "usuarioReintegra",
});

module.exports = Reintegro;
