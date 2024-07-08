"use strict";

const { getColumsSaredLogs } = require("#H/functions");
const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "log_asistencia",
          tableName: "log_asistencia",
          schema: Config.schemaTwo,
        },
        {
          id_personal: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          numDiaAsis: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
          },
          fechaAsistencia: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          asistio: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
          },
          activo: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          fechaReporte: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
          },
          observacionReporte: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          id_usuarioReporto: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          ...getColumsSaredLogs(Sequelize),
        }
      );
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "log_asistencia");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "log_asistencia" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "log_asistencia",
        schema: Config.schemaTwo,
      });
      console.log("+++++++D_R_O_P++++++", "log_asistencia");
    } catch (error) {
      console.log(
        "error dropTable:: " + "log_asistencia" + " message==>",
        error.message
      );
    }
  },
};
