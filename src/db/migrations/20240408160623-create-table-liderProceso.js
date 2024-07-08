"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "liderProceso",
          tableName: "liderProceso",
          schema: Config.schemaOne,
        },
        {
          idLiderProceso: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          id_usuario: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "usuario",
              key: "idUsuario",
            },
            onDelete: "RESTRICT",
          },
          id_area: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "area",
              key: "idArea",
            },
            onDelete: "RESTRICT",
          },
          id_empresa: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "empresa",
              key: "idEmpresa",
            },
            onDelete: "RESTRICT",
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "liderProceso");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "liderProceso" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "liderProceso",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "liderProceso");
    } catch (error) {
      console.log(
        "error dropTable:: " + "liderProceso" + " message==>",
        error.message
      );
    }
  },
};
