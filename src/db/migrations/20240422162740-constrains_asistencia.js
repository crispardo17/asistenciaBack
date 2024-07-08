"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.addConstraint(
        {
          tableName: "asistencia",
          schema: Config.schemaOne,
        },
        {
          fields: ["id_personal", "fechaAsistencia"],
          type: "unique",
          name: "unique_constraints_asistencia_idPersonalFechaAsistencia",
        }
      );

      console.log("******** OK_CONSTRAINTS => asistencia");
    } catch (error) {
      console.log(
        "ERROR_CONSTRAINTS:: " + "asistencia" + " message=>",
        error.message
      );
    }
  },
};
