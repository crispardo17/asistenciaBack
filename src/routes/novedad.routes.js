const { Router } = require("express");
const novedadController = require("#C/novedad.controller");

const {
  validate_create_novedad,
  validate_gestionar_novedad,
  validate_list,
  validate_update_novedad,
} = require("#MW/novedad.middlewares");
const router = Router();

router.get("/list/:tipo?", validate_list, novedadController.list_novedades);
router.post(
  "/create",
  validate_create_novedad,
  novedadController.create_novedad
);
router.put(
  "/update/:idReporteNovedad",
  validate_update_novedad,
  novedadController.update_novedad
);
router.put(
  "/gestionar-novedad/:tipo",
  validate_gestionar_novedad,
  novedadController.gestionar_novedad
);

module.exports = router;
