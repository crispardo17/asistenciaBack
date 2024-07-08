"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "reporteNovedad",
          tableName: "reporteNovedad",
          schema: Config.schemaOne,
        },
        {
          idReporteNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
          id_tipoNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "tipoNovedad",
              key: "idTipoNovedad",
            },
            onDelete: "RESTRICT",
          },
          observacionNovedad: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          observacionCierre: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          fechaInicioNovedad: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          fechaFinNovedad: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          adjuntoNovedad: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
          id_estadoNovedad: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "estado",
              key: "idEstado",
            },
            onDelete: "RESTRICT",
          },
          aprobado: {
            type: Sequelize.DataTypes.BOOLEAN,
          },
          respuestaNovedad: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          id_usuarioAprobo: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "usuario",
              key: "idUsuario",
            },
            onDelete: "RESTRICT",
          },
          fechaReporte: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          id_usuarioReporto: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "usuario",
              key: "idUsuario",
            },
            onDelete: "RESTRICT",
          },
          id_usuarioCerro: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "usuario",
              key: "idUsuario",
            },
            onDelete: "RESTRICT",
          },
          id_usuarioReverso: {
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "reporteNovedad");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "reporteNovedad" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "reporteNovedad",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "reporteNovedad");
    } catch (error) {
      console.log(
        "error dropTable:: " + "reporteNovedad" + " message==>",
        error.message
      );
    }
  },
};
