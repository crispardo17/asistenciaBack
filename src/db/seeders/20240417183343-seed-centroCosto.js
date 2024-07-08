'use strict';
const centroCostos = require("../../../jsons/centroCostos.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    try {
      const data = centroCostos.map((centroCosto) => ({
        ...centroCosto,
      }));
      await queryInterface.bulkInsert(
        { tableName: "centroCosto", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed centroCosto");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "centroCosto", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
