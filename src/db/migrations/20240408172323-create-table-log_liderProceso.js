"use strict";

const { getColumsSaredLogs } = require("#H/functions");
const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "log_liderProceso",
          tableName: "log_liderProceso",
          schema: Config.schemaTwo,
        },
        {
          id_usuario: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          id_area: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          id_empresa: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          activo: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          ...getColumsSaredLogs(Sequelize),
        }
      );
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "log_liderProceso");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "log_liderProceso" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "log_liderProceso",
        schema: Config.schemaTwo,
      });
      console.log("+++++++D_R_O_P++++++", "log_liderProceso");
    } catch (error) {
      console.log(
        "error dropTable:: " + "log_liderProceso" + " message==>",
        error.message
      );
    }
  },
};
