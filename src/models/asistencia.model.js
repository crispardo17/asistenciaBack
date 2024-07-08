const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany, createRecordLogs } = require("./_index");
const Personal = require("./personal.model.js");
const Usuario = require("./usuario.model.js");
const Estado = require("./estado.model.js");
const LogAsistencia = require("./logModel/log_asistencia.model");

const Asistencia = sequelize.define(
  "asistencia",
  {
    idAsistencia: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_estadoAsistencia ✔
    // id_usuarioReporto √
    // id_personal √
    numDiaAsis: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fechaAsistencia: {
      type: DataTypes.STRING,
      allowNull: false,
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
    fechaReporte: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observacionReporte: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "asistencia",
    indexes: [
      {
        unique: true,
        fields: ["idAsistencia"],
      },
    ],
    hooks: {
      afterCreate: async (data) => {
        await createRecordLogs({
          Model: LogAsistencia,
          values: { ...data.dataValues, IDTHIS: data?.idAsistencia },
        });
      },
      beforeBulkUpdate: (options) => {
        // habilitar los hoos de instancia para cada registro actualizado
        options.individualHooks = true;
      },
      afterUpdate: async (data) => {
        await createRecordLogs({
          Model: LogAsistencia,
          values: { ...data.dataValues, IDTHIS: data?.idAsistencia },
        });
      },
    },
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: Personal,
  ToMany: Asistencia,
  foreignKey: "id_personal",
});

relationOneToMany({
  One: Usuario,
  ToMany: Asistencia,
  foreignKey: "id_usuarioReporto",
});

relationOneToMany({
  One: Estado,
  ToMany: Asistencia,
  foreignKey: "id_estadoAsistencia",
});

module.exports = Asistencia;
