"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "adjuntoNovedad",
          tableName: "adjuntoNovedad",
          schema: Config.schemaOne,
        },
        {
          idAdjuntoNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          id_reporteNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            references: {
              model: "reporteNovedad",
              key: "idReporteNovedad",
            },
            onDelete: "RESTRICT",
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
            allowNull: false,
            references: {
              model: "usuario",
              key: "idUsuario",
            },
            onDelete: "RESTRICT",
          },
          activo: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "adjuntoNovedad");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "adjuntoNovedad" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "adjuntoNovedad",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "adjuntoNovedad");
    } catch (error) {
      console.log(
        "error dropTable:: " + "adjuntoNovedad" + " message==>",
        error.message
      );
    }
  },
};
