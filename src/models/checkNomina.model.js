const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany } = require("./_index.js");
const ReporteNovedad = require("./reporteNovedad.model");
const Usuario = require("./usuario.model");

const CheckNomina = sequelize.define(
  "checkNomina",
  {
    idCheckNomina: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_reporteNovedad √
    // id_usuarioCheck √
    fechaReporte: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "checkNomina",
    indexes: [
      {
        unique: true,
        fields: ["idCheckNomina"],
      },
    ],
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: ReporteNovedad,
  ToMany: CheckNomina,
  foreignKey: "id_reporteNovedad",
});

relationOneToMany({
  One: Usuario,
  ToMany: CheckNomina,
  foreignKey: "id_usuarioCheck",
  as: "usuarioCheckeo",
});
module.exports = CheckNomina;
