const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const ReporteNovedad = require("./reporteNovedad.model");
const { relationOneToMany } = require("./_index.js");
const Motivo = require("./motivo.model.js");
const Usuario = require("./usuario.model.js");

const NovedadReversada = sequelize.define(
  "novedadReversada",
  {
    idNovedadReversada: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_reporteNovedad √
    // id_motivo √
    // id_usuarioReversa √
    observacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "novedadReversada",
    indexes: [
      {
        unique: true,
        fields: ["idnovedadReversada"],
      },
    ],
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: ReporteNovedad,
  ToMany: NovedadReversada,
  foreignKey: "id_reporteNovedad",
});

relationOneToMany({
  One: Motivo,
  ToMany: NovedadReversada,
  foreignKey: "id_motivo",
});

relationOneToMany({
  One: Usuario,
  ToMany: NovedadReversada,
  foreignKey: "id_usuarioReversa",
  as: "usuarioReversa",
});

module.exports = NovedadReversada;
