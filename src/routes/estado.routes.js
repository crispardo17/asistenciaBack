const { Router } = require("express");
const estadoController = require("#C/estado.controller");

const router = Router();

router.get("/list", estadoController.list);

module.exports = router;
