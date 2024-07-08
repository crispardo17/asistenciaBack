const { Router } = require("express");
const tipoNotificacionController = require("#C/tipoNotificacion.controller");

const router = Router();

router.get("/list", tipoNotificacionController.list);

module.exports = router;
