const { Router } = require("express");
const reintegroController = require("#C/reintegro.controller");

const router = Router();

router.get("/list", reintegroController.list);
router.post("/create", reintegroController.create_reintegro);

module.exports = router;
