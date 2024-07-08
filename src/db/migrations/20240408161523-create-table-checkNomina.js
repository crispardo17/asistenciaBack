"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "checkNomina",
          tableName: "checkNomina",
          schema: Config.schemaOne,
        },
        {
          idCheckNomina: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          id_reporteNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "reporteNovedad",
              key: "idReporteNovedad",
            },
            onDelete: "RESTRICT",
          },
          fechaReporte: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
          },
          id_usuarioCheck: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "usuario",
              key: "idUsuario",
            },
            onDelete: "RESTRICT",
          },
          createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            field: "createdAt",
          },
          updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
            field: "updatedAt",
          },
        }
      );
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "checkNomina");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "checkNomina" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "checkNomina",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "checkNomina");
    } catch (error) {
      console.log(
        "error dropTable:: " + "checkNomina" + " message==>",
        error.message
      );
    }
  },
};
