const { DataTypes } = require("sequelize");
const sequelize = require("#DB/sequelize");
const config = require("#SRC/config/index");
const { relationOneToMany } = require("./_index");
const TipoNotificacion = require("./tipoNotificacion.model.js");

const Motivo = sequelize.define(
  "motivo",
  {
    idMotivo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_tipoNotificacion √
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    strCode: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "motivo",
    indexes: [
      {
        unique: true,
        fields: ["idMotivo"],
      },
    ],
    schema: config.schemaOne,
  }
);

relationOneToMany({
  One: TipoNotificacion,
  ToMany: Motivo,
  foreignKey: "id_tipoNotificacion",
});

module.exports = Motivo;
