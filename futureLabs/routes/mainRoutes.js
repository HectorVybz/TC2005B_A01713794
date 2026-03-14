const express = require("express");
const router = express.Router();
const hsrController = require("../controllers/hsrController");

router.get("/", (req, res) => {
    res.redirect("/inicio");
});

router.get("/inicio", hsrController.getInicio);
router.get("/personajes", hsrController.getPersonajes);
router.get("/facciones", hsrController.getFacciones);
router.get("/galeria", hsrController.getGaleria);
router.get("/preguntas", hsrController.getPreguntas);
router.get("/logout", hsrController.getLogout);

module.exports = router;