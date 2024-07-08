'use strict';
const cargos = require("../../../jsons/cargos.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    try {
      const data = cargos.map((cargo) => ({
        ...cargo,
      }));
      await queryInterface.bulkInsert(
        { tableName: "cargo", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed cargo");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "cargo", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
