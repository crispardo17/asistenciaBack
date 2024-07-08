"use strict";

const { getColumsSaredLogs } = require("#H/functions");
const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "log_personal",
          tableName: "log_personal",
          schema: Config.schemaTwo,
        },
        {
          tipoDocumento: {
            type: Sequelize.DataTypes.STRING(60),
            allowNull: true,
          },
          numDocumento: {
            type: Sequelize.DataTypes.STRING(30),
            allowNull: false,
          },
          nombre: {
            type: Sequelize.DataTypes.STRING(60),
            allowNull: false,
          },
          apellido: {
            type: Sequelize.DataTypes.STRING(60),
            allowNull: false,
          },
          id_contrato: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
          },
          id_area: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
          },
          liderProceso: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          fechaIngreso: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
          },
          ciudad: {
            type: Sequelize.DataTypes.STRING(30),
            allowNull: false,
          },
          id_empresa: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
          },
          id_cargo: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
          },
          activo: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          ...getColumsSaredLogs(Sequelize),
        }
      );
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "log_personal");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "log_personal" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "log_personal",
        schema: Config.schemaTwo,
      });
      console.log("+++++++D_R_O_P++++++", "log_personal");
    } catch (error) {
      console.log(
        "error dropTable:: " + "log_personal" + " message==>",
        error.message
      );
    }
  },
};
