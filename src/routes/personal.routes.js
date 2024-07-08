const { Router } = require("express");
const personalController = require("#C/personal.controller");

const router = Router();

router.get("/list/:modulo?", personalController.list);
router.get("/list-supervisores", personalController.list_personal_supervisor);
router.get(
  "/list-personal/:byDepartamento",
  personalController.list_personal_departamento
);

module.exports = router;
