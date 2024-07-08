const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany, createRecordLogs } = require("./_index.js");
const Motivo = require("./motivo.model.js");
const Asistencia = require("./asistencia.model.js");
const LogReporteNotificacion = require("./logModel/log_reporteNotificacion.model");
const Usuario = require("./usuario.model.js");

const ReporteNotificacion = sequelize.define(
  "reporteNotificacion",
  {
    idReporteNotificacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_motivo √
    // id_asistencia √
    // id_usuario ✔
    fechaGeneracion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    cantidadGenerada: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    perfilesShow: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    novedadesPorAprobar: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    leido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "reporteNotificacion",
    indexes: [
      {
        unique: true,
        fields: ["idReporteNotificacion"],
      },
    ],
    hooks: {
      afterCreate: async (data) => {
        await createRecordLogs({
          Model: LogReporteNotificacion,
          values: { ...data.dataValues, IDTHIS: data?.idReporteNotificacion },
        });
      },
      beforeBulkUpdate: (options) => {
        // habilitar los hoos de instancia para cada registro actualizado
        options.individualHooks = true;
      },
      afterUpdate: async (data) => {
        await createRecordLogs({
          Model: LogReporteNotificacion,
          values: { ...data.dataValues, IDTHIS: data?.idReporteNotificacion },
        });
      },
    },
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: Motivo,
  ToMany: ReporteNotificacion,
  foreignKey: "id_motivo",
});

relationOneToMany({
  One: Usuario,
  ToMany: ReporteNotificacion,
  foreignKey: "id_usuario",
});

relationOneToMany({
  One: Asistencia,
  ToMany: ReporteNotificacion,
  foreignKey: "id_asistencia",
});

module.exports = ReporteNotificacion;
