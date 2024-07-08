"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.addConstraint(
        {
          tableName: "liderProceso",
          schema: Config.schemaOne,
        },
        {
          fields: ["id_usuario", "id_empresa", "id_area"],
          type: "unique",
          name: "unique_constraints_liderProceso_usuario_empresa_area",
        }
      );

      console.log("******** OK_CONSTRAINTS => liderProceso");
    } catch (error) {
      console.log(
        "ERROR_CONSTRAINTS:: " + "liderProceso" + " message=>",
        error.message
      );
    }
  },
};
