"use strict";

const Config = require("#SRC/config/index");
const { getColumsSaredLogs } = require("#H/functions");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "log_reporteNotificacion",
          tableName: "log_reporteNotificacion",
          schema: Config.schemaTwo,
        },
        {
          id_usuario: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          id_motivo: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          id_asistencia: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
          },
          fechaGeneracion: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
          },
          cantidadGenerada: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
          },
          perfilesShow: {
            type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
            allowNull: true,
          },
          novedadesPorAprobar: {
            type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
            allowNull: true,
          },
          mensaje: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
          },
          leido: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          activo: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
          ...getColumsSaredLogs(Sequelize),
        }
      );
      console.log(
        "+++++++__S__U__C__C__E__S__S__++++++",
        "log_reporteNotificacion"
      );
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " +
          "log_reporteNotificacion" +
          " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "log_reporteNotificacion",
        schema: Config.schemaTwo,
      });
      console.log("+++++++D_R_O_P++++++", "log_reporteNotificacion");
    } catch (error) {
      console.log(
        "error dropTable:: " + "log_reporteNotificacion" + " message==>",
        error.message
      );
    }
  },
};
