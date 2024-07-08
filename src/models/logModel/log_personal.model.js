const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { DataTypes } = require("sequelize");

const logPersonal = sequelize.define(
  "log_personal",
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
    tipoDocumento: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    numDocumento: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    id_contrato: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_area: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    liderProceso: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    fechaIngreso: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    ciudad: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    id_empresa: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_cargo: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: "log_personal",
    freezeTableName: true,
    schema: config.schemaTwo,
  }
);

module.exports = logPersonal;
