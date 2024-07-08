'use strict';
const tipificaciones = require("../../../jsons/tipoNotificaciones.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    try {
      const data = tipificaciones.map((tipificacion) => ({
        ...tipificacion,
      }));
      await queryInterface.bulkInsert(
        { tableName: "tipoNotificacion", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed tipoNotificacion");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "tipoNotificacion", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
