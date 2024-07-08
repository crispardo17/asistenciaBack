const { Router } = require("express");
const areaController = require("#C/area.controller");

const router = Router();

router.get("/list", areaController.list);
router.get("/list-asignacion", areaController.list_asignacion);

module.exports = router;
