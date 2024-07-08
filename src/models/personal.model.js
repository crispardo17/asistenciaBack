const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany, createRecordLogs } = require("./_index");
const Empresa = require("./empresa.model");
const Area = require("./area.model");
const Cargo = require("./cargo.model");
const logPersonal = require("./logModel/log_personal.model");

const Personal = sequelize.define(
  "personal",
  {
    idPersonal: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tipoDocumento: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    numDocumento: {
      type: DataTypes.STRING(30),
      allowNull: false,
      // unique: {
      //   msg: "Ya existe un personal registrado con este numero de documento",
      // },
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
    // id_area:
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
    // id_empresa
    // id_cargo
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "personal",
    indexes: [
      {
        unique: true,
        fields: ["idPersonal"],
      },
    ],
    hooks: {
      afterCreate: async (data) => {
        await createRecordLogs({
          Model: logPersonal,
          values: { ...data.dataValues, IDTHIS: data?.idPersonal },
        });
      },
      beforeBulkUpdate: (options) => {
        // habilitar los hoos de instancia para cada registro actualizado
        options.individualHooks = true;
      },
      afterUpdate: async (data) => {
        await createRecordLogs({
          Model: logPersonal,
          values: { ...data.dataValues, IDTHIS: data?.idPersonal },
        });
      },
    },
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: Area,
  ToMany: Personal,
  foreignKey: "id_area",
});

relationOneToMany({
  One: Empresa,
  ToMany: Personal,
  foreignKey: "id_empresa",
});

relationOneToMany({
  One: Cargo,
  ToMany: Personal,
  foreignKey: "id_cargo",
});

module.exports = Personal;
