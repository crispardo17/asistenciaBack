const { Router } = require("express");
const tipoEstadoController = require("#C/tipoEstado.controller");

const router = Router();

router.get("/list", tipoEstadoController.list);

module.exports = router;
