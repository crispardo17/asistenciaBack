const { Router } = require("express");
const reporteNotificacionControllers = require("#C/reporteNotificacion.controller");
const {
  validation_list_ReporteNotificacion,
  validation_patch_ReporteNotificacion,
} = require("#MW/reporteNotificacion.middlewares");

const router = Router();
router.get("/prueba", reporteNotificacionControllers.prueba);
router.get(
  "/list/:tipo?",
  validation_list_ReporteNotificacion,
  reporteNotificacionControllers.list
);
router.patch(
  "/leer/:idReporteNotificacion",
  validation_patch_ReporteNotificacion,
  reporteNotificacionControllers.patch_leido_reporteNotificacion
);

module.exports = router;
