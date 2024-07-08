"use strict";
const tipoNovedads = require("../../../jsons/tipoNovedades.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      const data = tipoNovedads.map((tipoNovedad) => ({
        ...tipoNovedad,
      }));
      await queryInterface.bulkInsert(
        { tableName: "tipoNovedad", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed tipoNovedad");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "tipoNovedad", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
