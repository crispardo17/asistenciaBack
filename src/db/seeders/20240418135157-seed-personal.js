'use strict';
const personals = require("../../../jsons/personals.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    try {
      const data = personals.map((personal) => ({
        ...personal,
      }));
      await queryInterface.bulkInsert(
        { tableName: "personal", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed personal");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "personal", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
