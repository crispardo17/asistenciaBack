"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "reporteNotificacion",
          tableName: "reporteNotificacion",
          schema: Config.schemaOne,
        },
        {
          idReporteNotificacion: {
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
            comment:
              "esta f-key define  el usuario en primer nivel al que pertenece o se va a registrar la notificación.",
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
          id_asistencia: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "asistencia",
              key: "idAsistencia",
            },
            onDelete: "RESTRICT",
          },
          perfilesShow: {
            type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
            allowNull: true,
          },
          novedadesPorAprobar: {
            type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
            allowNull: true,
          },
          mensaje: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
          },
          cantidadGenerada: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
          },
          fechaGeneracion: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
          },

          leido: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          activo: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
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
      console.log(
        "+++++++__S__U__C__C__E__S__S__++++++",
        "reporteNotificacion"
      );
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "reporteNotificacion" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "reporteNotificacion",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "reporteNotificacion");
    } catch (error) {
      console.log(
        "error dropTable:: " + "reporteNotificacion" + " message==>",
        error.message
      );
    }
  },
};
