"use strict";
const liderProcesos = require("../../../jsons/liderProcesos.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      const data = liderProcesos.map((liderProceso) => ({
        ...liderProceso,
      }));
      await queryInterface.bulkInsert(
        { tableName: "liderProceso", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed liderProceso");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "liderProceso", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
