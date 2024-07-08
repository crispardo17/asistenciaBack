'use strict';
const areas = require("../../../jsons/areas.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    try {
      const data = areas.map((area) => ({
        ...area,
      }));
      await queryInterface.bulkInsert(
        { tableName: "area", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed area");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "area", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
