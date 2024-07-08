"use strict";

const Config = require("#SRC/config/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.addConstraint(
        {
          tableName: "usuario",
          schema: Config.schemaOne,
        },
        {
          fields: ["id_tipoDocumento", "numDocumento", "id_personalBase"],
          type: "unique",
          name: "unique_constraints_usuario_doc_tipoDoc_id_personalBase",
        }
      );

      console.log("******** OK_CONSTRAINTS => usuario");
    } catch (error) {
      console.log(
        "ERROR_CONSTRAINTS:: " + "usuario" + " message=>",
        error.message,
        error
      );
    }
  },
};
