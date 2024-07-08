const { Router } = require("express");
const cargoController = require("#C/cargo.controller");

const router = Router();

router.get("/list", cargoController.list);

module.exports = router;
