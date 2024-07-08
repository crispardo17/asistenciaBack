"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "centroCosto",
          tableName: "centroCosto",
          schema: Config.schemaOne,
        },
        {
          idCentroCosto: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre: {
            type: Sequelize.DataTypes.STRING(60),
            allowNull: false,
          },
          codigo: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "centroCosto");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "centroCosto" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "centroCosto",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "centroCosto");
    } catch (error) {
      console.log(
        "error dropTable:: " + "centroCosto" + " message==>",
        error.message
      );
    }
  },
};
