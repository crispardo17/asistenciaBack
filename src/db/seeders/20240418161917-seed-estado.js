"use strict";
const estados = require("../../../jsons/estados.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      const data = estados.map((estado) => ({
        ...estado,
      }));
      await queryInterface.bulkInsert(
        { tableName: "estado", schema: config.schemaOne },
        data,
        {}
      );
      console.log("success seed estado");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete(
        { tableName: "estado", schema: config.schemaOne },
        {},
        {}
      );
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
