const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany, createRecordLogs } = require("./_index");
const Usuario = require("./usuario.model.js");
const Area = require("./area.model.js");
const Empresa = require("./empresa.model.js");
const LogLiderProceso = require("./logModel/log_liderProceso");

const LiderProceso = sequelize.define(
  "liderProceso",
  {
    idLiderProceso: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_usuario √
    // id_area: √
    // id_empresa: √
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "liderProceso",
    indexes: [
      {
        unique: true,
        fields: ["idLiderProceso"],
      },
    ],
    hooks: {
      afterCreate: async (data) => {
        await createRecordLogs({
          Model: LogLiderProceso,
          values: { ...data.dataValues, IDTHIS: data?.idLiderProceso },
        });
      },
      beforeBulkUpdate: (options) => {
        // habilitar los hoos de instancia para cada registro actualizado
        options.individualHooks = true;
      },
      afterUpdate: async (data) => {
        await createRecordLogs({
          Model: LogLiderProceso,
          values: { ...data.dataValues, IDTHIS: data?.idLiderProceso },
        });
      },
    },
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: Usuario,
  ToMany: LiderProceso,
  foreignKey: "id_usuario",
});

relationOneToMany({
  One: Area,
  ToMany: LiderProceso,
  foreignKey: "id_area",
});

relationOneToMany({
  One: Empresa,
  ToMany: LiderProceso,
  foreignKey: "id_empresa",
});

module.exports = LiderProceso;
