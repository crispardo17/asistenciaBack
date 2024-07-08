const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany } = require("./_index");
const Usuario = require("./usuario.model");

const LastAsistenciaResponsable = sequelize.define(
  "lastAsistenciaResponsable",
  {
    idLastAsistenciaResponsable: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_usuarioResponsable ✔
    lastFecha: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "lastAsistenciaResponsable",
    indexes: [
      {
        unique: false,
        fields: ["id_usuarioResponsable"],
      },
    ],
    schema: config.schemaOne,
    hooks: {
      beforeBulkUpdate: (options) => {
        // habilitar los hoos de instancia para cada registro actualizado
        options.individualHooks = true;
      },
    },
  }
);

relationOneToMany({
  One: Usuario,
  ToMany: LastAsistenciaResponsable,
  foreignKey: "id_usuarioResponsable",
  as: "usuarioResponsable",
});

module.exports = LastAsistenciaResponsable;
