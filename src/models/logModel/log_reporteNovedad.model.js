const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { DataTypes } = require("sequelize");

const LogReporteNovedad = sequelize.define(
  "log_reporteNovedad",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    IDTHIS: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_asistencia: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    id_tipoNovedad: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
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
    id_estadoNovedad: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    aprobado: {
      type: DataTypes.BOOLEAN,
    },
    respuestaNovedad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_usuarioAprobo: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    fechaReporte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_usuarioReporto: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    id_usuarioCerro: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    id_usuarioReverso: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    ipUsuarioOperacion: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    idUsuarioOperacion: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    clientAgent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipoOperacion: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    createdAt: true,
    updatedAt: false,
    tableName: "log_reporteNovedad",
    freezeTableName: true,
    schema: config.schemaTwo,
  }
);

module.exports = LogReporteNovedad;
