const { Router } = require("express");
const tipoNovedadController = require("#C/tipoNovedad.controller");

const router = Router();

router.get("/list", tipoNovedadController.list);

module.exports = router;
