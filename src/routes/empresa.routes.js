const { Router } = require("express");
const empresaController = require("#C/empresa.controller");

const router = Router();

router.get("/list", empresaController.list);

module.exports = router;
