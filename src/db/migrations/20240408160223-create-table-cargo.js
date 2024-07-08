"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable(
        {
          name: "cargo",
          tableName: "cargo",
          schema: Config.schemaOne,
        },
        {
          idCargo: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          descripcion: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
          },
          activo: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
          },
          salario: {
            type: Sequelize.DataTypes.DOUBLE,
            allowNull: true,
          },
          capacitacion: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
          },
          duracionCapacitacion: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
          },
          resumen: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
          },
          poligrafia: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
          },
          visita: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
          },
          responsabilidad: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          id_departamento: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null,
            references: {
              model: "departamento",
              key: "idDepartamento",
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
      console.log("+++++++__S__U__C__C__E__S__S__++++++", "cargo");
    } catch (error) {
      console.log(
        "E_R_R_O_R createTable MIG:: " + "cargo" + " message=>",
        error.message
      );
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable({
        tableName: "cargo",
        schema: Config.schemaOne,
      });
      console.log("+++++++D_R_O_P++++++", "cargo");
    } catch (error) {
      console.log(
        "error dropTable:: " + "cargo" + " message==>",
        error.message
      );
    }
  },
};
