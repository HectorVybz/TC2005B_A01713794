const express = require("express");
const router = express.Router();
const hsrController = require("../controllers/hsrController");
const hasPermission = require("../middleware/has-permission");

router.get("/", (req, res) => {
    res.redirect("/inicio");
});

router.get("/inicio", hsrController.getInicio);
router.get("/personajes", hsrController.getPersonajes);
router.get("/personajes/nuevo", hasPermission("personajes_crear"), hsrController.getNuevoPersonaje);
router.get("/personajes/editar/:id", hasPermission("personajes_editar"), hsrController.getEditarPersonaje);
router.get("/personajes/:id", hsrController.getPersonajeDetalle);
router.get("/facciones", hsrController.getFacciones);
router.get("/galeria", hsrController.getGaleria);
router.get("/preguntas", hsrController.getPreguntas);

router.post("/personajes/nuevo", hasPermission("personajes_crear"), hsrController.postNuevoPersonaje);
router.post("/personajes/editar", hasPermission("personajes_editar"), hsrController.postEditarPersonaje);

module.exports = router;
