'use strict';
const empresas = require("../../../jsons/empresas.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    try {
      const data = empresas.map((empresa) => ({
        ...empresa,
      }));
      await queryInterface.bulkInsert(
        { tableName: "empresa", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed empresa");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "empresa", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
