"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "tipoEstado",
          tableName: "tipoEstado",
          schema: Config.schemaOne,
        },
        {
          idTipoEstado: {
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
            allowNull: false,
          },
          strCode: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "tipoEstado");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "tipoEstado" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "tipoEstado",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "tipoEstado");
    } catch (error) {
      console.log(
        "error dropTable:: " + "tipoEstado" + " message==>",
        error.message
      );
    }
  },
};
