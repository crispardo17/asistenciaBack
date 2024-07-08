"use strict";

const { getColumsSaredLogs } = require("#H/functions");
const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "log_reporteNovedad",
          tableName: "log_reporteNovedad",
          schema: Config.schemaTwo,
        },
        {
          id_asistencia: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
          },
          id_tipoNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          observacionNovedad: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          observacionCierre: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          fechaInicioNovedad: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          fechaFinNovedad: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          adjuntoNovedad: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
          id_estadoNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          aprobado: {
            type: Sequelize.DataTypes.BOOLEAN,
          },
          respuestaNovedad: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          id_usuarioAprobo: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          fechaReporte: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          id_usuarioReporto: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          id_usuarioCerro: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          id_usuarioReverso: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          ...getColumsSaredLogs(Sequelize),
        }
      );
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "log_reporteNovedad");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "log_reporteNovedad" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "log_reporteNovedad",
        schema: Config.schemaTwo,
      });
      console.log("+++++++D_R_O_P++++++", "log_reporteNovedad");
    } catch (error) {
      console.log(
        "error dropTable:: " + "log_reporteNovedad" + " message==>",
        error.message
      );
    }
  },
};
