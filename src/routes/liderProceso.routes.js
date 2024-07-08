const { Router } = require("express");
const liderProcesoController = require("#C/liderProceso.controller");

const router = Router();

router.get("/list", liderProcesoController.list_lideresProceso);
router.post("/create", liderProcesoController.create_liderProceso);
router.post(
  "/asignar-responable/:idPersonal",
  liderProcesoController.asignar_personal_responsable
);
router.put(
  "/update/:idLiderProceso",
  liderProcesoController.update_liderProceso
);

module.exports = router;
