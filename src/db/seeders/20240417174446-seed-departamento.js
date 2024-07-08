'use strict';
const departamentos = require("../../../jsons/departamentos.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    try {
      const data = departamentos.map((departamento) => ({
        ...departamento,
      }));
      await queryInterface.bulkInsert(
        { tableName: "departamento", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed departamento");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "departamento", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
