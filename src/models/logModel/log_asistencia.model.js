const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { DataTypes } = require("sequelize");

const LogAsistencia = sequelize.define(
  "log_asistencia",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    // id de la tabla original
    IDTHIS: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_personal: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    numDiaAsis: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    asistio: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    fechaAsistencia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaReporte: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observacionReporte: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_usuarioReporto: {
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
    // methods API REST
    tipoOperacion: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    createdAt: true,
    updatedAt: false,
    tableName: "log_asistencia",
    freezeTableName: true,
    schema: config.schemaTwo,
  }
);

module.exports = LogAsistencia;
