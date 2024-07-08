"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        { name: "personal", tableName: "personal", schema: Config.schemaOne },
        {
          idPersonal: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          tipoDocumento: {
            type: Sequelize.DataTypes.STRING(60),
            allowNull: true,
          },
          numDocumento: {
            type: Sequelize.DataTypes.STRING(30),
            allowNull: false,
            // unique: {
            //   msg: "Ya existe un personal registrado con este numero de documento",
            // },
          },
          nombre: {
            type: Sequelize.DataTypes.STRING(60),
            allowNull: false,
          },
          apellido: {
            type: Sequelize.DataTypes.STRING(60),
            allowNull: false,
          },
          id_contrato: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
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
          liderProceso: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          fechaIngreso: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
          },
          ciudad: {
            type: Sequelize.DataTypes.STRING(30),
            allowNull: false,
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
          id_cargo: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "cargo",
              key: "idCargo",
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "personal");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "personal" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "personal",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "personal");
    } catch (error) {
      console.log(
        "error dropTable:: " + "personal" + " message==>",
        error.message
      );
    }
  },
};
