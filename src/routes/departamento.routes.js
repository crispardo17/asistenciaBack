const { Router } = require("express");
const departamentoController = require("#C/departamento.controller");

const router = Router();

router.get("/list", departamentoController.list);

module.exports = router;
