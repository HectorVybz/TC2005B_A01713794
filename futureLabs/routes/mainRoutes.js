const express = require("express");
const router = express.Router();
const hsrController = require("../controllers/hsrController");

router.get("/", (req, res) => {
    res.redirect("/inicio");
});

router.get("/inicio", hsrController.getInicio);
router.get("/personajes", hsrController.getPersonajes);
router.get("/personajes/nuevo", hsrController.getNuevoPersonaje);
router.get("/personajes/editar/:id", hsrController.getEditarPersonaje);
router.get("/personajes/:id", hsrController.getPersonajeDetalle);
router.get("/facciones", hsrController.getFacciones);
router.get("/galeria", hsrController.getGaleria);
router.get("/preguntas", hsrController.getPreguntas);
router.get("/logout", hsrController.getLogout);

router.post("/personajes/nuevo", hsrController.postNuevoPersonaje);
router.post("/personajes/editar", hsrController.postEditarPersonaje);

module.exports = router;