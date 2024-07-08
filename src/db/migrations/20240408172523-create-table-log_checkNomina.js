"use strict";

const { getColumsSaredLogs } = require("#H/functions");
const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "log_checkNomina",
          tableName: "log_checkNomina",
          schema: Config.schemaTwo,
        },
        {
          id_reporteNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          fechaReporte: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
          },
          id_usuarioCheck: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          ...getColumsSaredLogs(Sequelize),
        }
      );
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "log_checkNomina");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "log_checkNomina" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "log_checkNomina",
        schema: Config.schemaTwo,
      });
      console.log("+++++++D_R_O_P++++++", "log_checkNomina");
    } catch (error) {
      console.log(
        "error dropTable:: " + "log_checkNomina" + " message==>",
        error.message
      );
    }
  },
};
