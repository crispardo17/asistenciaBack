"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        { name: "reintegro", tableName: "reintegro", schema: Config.schemaOne },
        {
          idReintegro: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          id_personal: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "personal",
              key: "idPersonal",
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
          id_estadoReintegro: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "estado",
              key: "idEstado",
            },
            onDelete: "RESTRICT",
          },
          id_usuarioReintegra: {
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "reintegro");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "reintegro" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "reintegro",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "reintegro");
    } catch (error) {
      console.log(
        "error dropTable:: " + "reintegro" + " message==>",
        error.message
      );
    }
  },
};
