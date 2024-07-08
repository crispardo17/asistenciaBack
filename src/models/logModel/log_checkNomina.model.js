const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { DataTypes } = require("sequelize");

const LogCheckNomina = sequelize.define(
  "log_checkNomina",
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
    fechaReporte: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_usuarioCheck: {
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
    tableName: "log_checkNomina",
    freezeTableName: true,
    schema: config.schemaTwo,
  }
);

module.exports = LogCheckNomina;
