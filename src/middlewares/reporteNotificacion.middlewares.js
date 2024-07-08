const { messages } = require("#H/utils");
const { param } = require("express-validator");
const { validateResults } = require("./_index");
const { TIPOS_PARAM_NOTIFICACION } = require("#H/vars");

exports.validation_list_ReporteNotificacion = [
  param("tipo")
    .optional({ values: "null" })
    .notEmpty()
    .isString()
    .isIn(Object.values(TIPOS_PARAM_NOTIFICACION))
    .withMessage(messages.CAMPO_INCORRECT("param tipo invalido"))
    .bail(),
  validateResults(),
];

exports.validation_patch_ReporteNotificacion = [
  param("idReporteNotificacion")
    .optional({ values: "null" })
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage(messages.CAMPO_INCORRECT("id reporte"))
    .bail(),
  validateResults(),
];
