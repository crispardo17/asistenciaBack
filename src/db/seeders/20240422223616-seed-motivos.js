"use strict";
const motivos = require("../../../jsons/motivos.json");
const config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      const data = motivos.map((motivo) => ({
        ...motivo,
      }));
      await queryInterface.bulkInsert(
        { tableName: "motivo", schema: config.schemaOne },
        data
      );
      console.log("success seed motivo");
    } catch (error) {
      console.log("error::", error.message);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.bulkDelete({
        tableName: "motivo",
        schema: config.schemaOne,
      });
    } catch (error) {
      console.log("error::", error.message);
    }
  },
};
