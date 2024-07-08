"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "empresa",
          tableName: "empresa",
          schema: Config.schemaOne,
        },
        {
          idEmpresa: {
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "empresa");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "empresa" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "empresa",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "empresa");
    } catch (error) {
      console.log(
        "error dropTable:: " + "empresa" + " message==>",
        error.message
      );
    }
  },
};
