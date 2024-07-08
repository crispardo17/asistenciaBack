const { Router } = require("express");
const centroCostoController = require("#C/centroCosto.controller");

const router = Router();

router.get("/list", centroCostoController.list);

module.exports = router;
