const express = require("express");
const router = express.Router();
const hsrController = require("../controllers/hsrController");

router.get("/contacto", hsrController.getContacto);
router.post("/enviar", hsrController.postEnviar);

module.exports = router;