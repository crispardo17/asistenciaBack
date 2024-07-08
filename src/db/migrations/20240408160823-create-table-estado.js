"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "estado",
          tableName: "estado",
          schema: Config.schemaOne,
        },
        {
          idEstado: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre: {
            type: Sequelize.DataTypes.STRING(60),
            allowNull: false,
          },
          strCode: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          id_tipoEstado: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "tipoEstado",
              key: "idTipoEstado",
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "estado");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "estado" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "estado",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "estado");
    } catch (error) {
      console.log(
        "error dropTable:: " + "estado" + " message==>",
        error.message
      );
    }
  },
};
