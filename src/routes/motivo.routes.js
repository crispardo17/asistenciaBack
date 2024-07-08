const { Router } = require("express");
const motivoController = require("#C/motivo.controller");

const router = Router();

router.get("/list", motivoController.list_motivos);

module.exports = router;
