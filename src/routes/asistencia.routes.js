const { Router } = require("express");
const router = Router();
const asistenciaControllers = require("#C/asistencia.controllers");
const {
  validate_create_asistencia,
  validate_list_asistencia,
  validate_update_asistencia,
  validate_show_asistencia,
} = require("#MW/asistencia.middlewares");

router.post(
  "/create",
  validate_create_asistencia,
  asistenciaControllers.create_asistencia
);
router.get(
  "/show/:idAsistencia",
  validate_show_asistencia,
  asistenciaControllers.show_asistencia
);
router.get(
  "/list/:tipo?",
  validate_list_asistencia,
  asistenciaControllers.list_asistencias
);
router.put(
  "/update/:idAsistencia",
  validate_update_asistencia,
  asistenciaControllers.update_asistencia
);

module.exports = router;
