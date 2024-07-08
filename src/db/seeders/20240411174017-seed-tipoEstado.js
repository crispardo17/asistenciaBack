'use strict';
const tipificaciones = require("../../../jsons/tipoEstados.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    try {
      const data = tipificaciones.map((tipificacion) => ({
        ...tipificacion,
      }));
      await queryInterface.bulkInsert(
        { tableName: "tipoEstado", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed tipoEstado");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "tipoEstado", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
