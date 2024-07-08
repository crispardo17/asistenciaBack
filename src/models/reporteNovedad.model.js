const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany, createRecordLogs } = require("./_index");
const Asistencia = require("./asistencia.model.js");
const TipoNovedad = require("./tipoNovedad.model.js");
const Estado = require("./estado.model.js");
const Usuario = require("./usuario.model.js");
const LogReporteNovedad = require("./logModel/log_reporteNovedad.model");

const ReporteNovedad = sequelize.define(
  "reporteNovedad",
  {
    idReporteNovedad: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_asistencia: √
    // id_estadoNovedad √
    // id_tipoNovedad √
    // id_usuarioAprobo √
    // id_usuarioReporto √
    // id_usuarioCerro √
    // id_usuarioReverso √
    observacionNovedad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observacionCierre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fechaInicioNovedad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaFinNovedad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adjuntoNovedad: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    aprobado: {
      type: DataTypes.BOOLEAN,
    },
    respuestaNovedad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fechaReporte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "reporteNovedad",
    indexes: [
      {
        unique: true,
        fields: ["idReporteNovedad"],
      },
    ],
    hooks: {
      afterCreate: async (data) => {
        await createRecordLogs({
          Model: LogReporteNovedad,
          values: { ...data.dataValues, IDTHIS: data?.idReporteNovedad },
        });
      },
      beforeBulkUpdate: (options) => {
        // habilitar los hoos de instancia para cada registro actualizado
        options.individualHooks = true;
      },
      afterUpdate: async (data) => {
        await createRecordLogs({
          Model: LogReporteNovedad,
          values: { ...data.dataValues, IDTHIS: data?.idReporteNovedad },
        });
      },
    },
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: Asistencia,
  ToMany: ReporteNovedad,
  foreignKey: "id_asistencia",
});

relationOneToMany({
  One: TipoNovedad,
  ToMany: ReporteNovedad,
  foreignKey: "id_tipoNovedad",
});

relationOneToMany({
  One: Estado,
  ToMany: ReporteNovedad,
  foreignKey: "id_estadoNovedad",
});

relationOneToMany({
  One: Usuario,
  ToMany: ReporteNovedad,
  foreignKey: "id_usuarioAprobo",
  as: "usuarioAprobo", // Alias para la asociación con id_usuarioAprobo
});

relationOneToMany({
  One: Usuario,
  ToMany: ReporteNovedad,
  foreignKey: "id_usuarioReporto",
  as: "usuarioReporto", // Alias para la asociación con id_usuarioReporto
});

relationOneToMany({
  One: Usuario,
  ToMany: ReporteNovedad,
  foreignKey: "id_usuarioCerro",
  as: "usuarioCerro",
});

relationOneToMany({
  One: Usuario,
  ToMany: ReporteNovedad,
  foreignKey: "id_usuarioReverso",
  as: "usuarioReverso",
});

module.exports = ReporteNovedad;
