const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { DataTypes } = require("sequelize");

const LogReporteNotificacion = sequelize.define(
  "log_reporteNotificacion",
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
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment:
        "esta f-key define  el usuario en primer nivel al que pertenece o se va a registrar la notificación.",
    },
    id_motivo: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    id_asistencia: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
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
    tableName: "log_reporteNotificacion",
    freezeTableName: true,
    schema: config.schemaTwo,
  }
);

module.exports = LogReporteNotificacion;
