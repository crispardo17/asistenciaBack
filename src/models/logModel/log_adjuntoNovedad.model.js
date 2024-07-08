const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { DataTypes } = require("sequelize");

const LogAdjuntoNovedad = sequelize.define(
  "log_adjuntoNovedad",
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
    id_reporteNovedad: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
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
    id_usuarioCarga: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
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
    tableName: "log_adjuntoNovedad",
    freezeTableName: true,
    schema: config.schemaTwo,
  }
);

module.exports = LogAdjuntoNovedad;
