const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany, createRecordLogs } = require("./_index");
const ReporteNovedad = require("./reporteNovedad.model");
const Usuario = require("./usuario.model.js");
const LogAdjuntoNovedad = require("./logModel/log_adjuntoNovedad.model");

const AdjuntoNovedad = sequelize.define(
  "adjuntoNovedad",
  {
    idAdjuntoNovedad: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_reporteNovedad √
    // id_usuarioCarga √
    ubicacionAdjuntoNovedad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombreFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombreOriginal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fechaCargue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "adjuntoNovedad",
    indexes: [
      {
        unique: true,
        fields: ["idAdjuntoNovedad"],
      },
    ],
    hooks: {
      afterCreate: async (data) => {
        await createRecordLogs({
          Model: LogAdjuntoNovedad,
          values: { ...data.dataValues, IDTHIS: data?.idAdjuntoNovedad },
        });
      },
      beforeBulkUpdate: (options) => {
        // habilitar los hoos de instancia para cada registro actualizado
        options.individualHooks = true;
      },
      afterUpdate: async (data) => {
        await createRecordLogs({
          Model: LogAdjuntoNovedad,
          values: { ...data.dataValues, IDTHIS: data?.idAdjuntoNovedad },
        });
      },
    },
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: ReporteNovedad,
  ToMany: AdjuntoNovedad,
  foreignKey: "id_reporteNovedad",
});

relationOneToMany({
  One: Usuario,
  ToMany: AdjuntoNovedad,
  foreignKey: "id_usuarioCarga",
});

module.exports = AdjuntoNovedad;
