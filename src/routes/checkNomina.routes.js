const { Router } = require("express");
const checkNominaController = require("#C/checkNomina.controller");

const router = Router();

router.get("/list", checkNominaController.list);
router.post("/create", checkNominaController.create_check_nomina);

module.exports = router;
