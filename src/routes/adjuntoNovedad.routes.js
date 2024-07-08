const { Router } = require("express");
const adjuntoNovedadController = require("#C/adjuntoNovedad.controller");
const {
  validate_create_file_reporteNovedad,
} = require("#MW/files_adjuntoNovedad.middlewares");

const router = Router();

router.post(
  "/create",
  validate_create_file_reporteNovedad,
  adjuntoNovedadController.create_adjunto_novedad
);

router.get(
  "/show/:idAdjuntoNovedad",
  adjuntoNovedadController.get_adjunto_novedad
);

router.get("/list", adjuntoNovedadController.list_adjuntos_novedad);
module.exports = router;
