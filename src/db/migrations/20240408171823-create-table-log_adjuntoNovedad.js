"use strict";

const { getColumsSaredLogs } = require("#H/functions");
const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "log_adjuntoNovedad",
          tableName: "log_adjuntoNovedad",
          schema: Config.schemaTwo,
        },
        {
          id_reporteNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          ubicacionAdjuntoNovedad: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          nombreFile: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          nombreOriginal: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          peso: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          extension: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          mimetype: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          fechaCargue: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          id_usuarioCarga: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          activo: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
          },
          ...getColumsSaredLogs(Sequelize),
        }
      );
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "log_adjuntoNovedad");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "log_adjuntoNovedad" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "log_adjuntoNovedad",
        schema: Config.schemaTwo,
      });
      console.log("+++++++D_R_O_P++++++", "log_adjuntoNovedad");
    } catch (error) {
      console.log(
        "error dropTable:: " + "log_adjuntoNovedad" + " message==>",
        error.message
      );
    }
  },
};
