"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "tipoNovedad",
          tableName: "tipoNovedad",
          schema: Config.schemaOne,
        },
        {
          idTipoNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre: {
            type: Sequelize.DataTypes.STRING(60),
            allowNull: false,
          },
          descripcion: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          strCode: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          reporte: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          especial: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          activo: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "tipoNovedad");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "tipoNovedad" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "tipoNovedad",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "tipoNovedad");
    } catch (error) {
      console.log(
        "error dropTable:: " + "tipoNovedad" + " message==>",
        error.message
      );
    }
  },
};
