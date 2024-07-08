"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "novedadReversada",
          tableName: "novedadReversada",
          schema: Config.schemaOne,
        },
        {
          idNovedadReversada: {
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
          id_motivo: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "motivo",
              key: "idMotivo",
            },
            onDelete: "RESTRICT",
          },
          observacion: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          id_usuarioReversa: {
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "novedadReversada");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "novedadReversada" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "novedadReversada",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "novedadReversada");
    } catch (error) {
      console.log(
        "error dropTable:: " + "novedadReversada" + " message==>",
        error.message
      );
    }
  },
};
