"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "asistencia",
          tableName: "asistencia",
          schema: Config.schemaOne,
        },
        {
          idAsistencia: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          id_personal: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            references: {
              model: "personal",
              key: "idPersonal",
            },
            onDelete: "RESTRICT",
          },
          numDiaAsis: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
          },
          fechaAsistencia: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          asistio: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
          },
          activo: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          fechaReporte: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
          },
          observacionReporte: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          id_usuarioReporto: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            references: {
              model: "usuario",
              key: "idUsuario",
            },
            onDelete: "RESTRICT",
          },
          id_estadoAsistencia: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            references: {
              model: "estado",
              key: "idEstado",
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "asistencia");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "asistencia" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "asistencia",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "asistencia");
    } catch (error) {
      console.log(
        "error dropTable:: " + "asistencia" + " message==>",
        error.message
      );
    }
  },
};
