const express = require("express");
const router = express.Router();
const hsrController = require("../controllers/hsrController");
const isAuth = require("../middleware/is-auth");

router.get("/", (req, res) => {
    res.redirect("/inicio");
});

router.get("/inicio", hsrController.getInicio);
router.get("/personajes", hsrController.getPersonajes);
router.get("/personajes/nuevo", isAuth, hsrController.getNuevoPersonaje);
router.get("/personajes/editar/:id", isAuth, hsrController.getEditarPersonaje);
router.get("/personajes/:id", hsrController.getPersonajeDetalle);
router.get("/facciones", hsrController.getFacciones);
router.get("/galeria", hsrController.getGaleria);
router.get("/preguntas", hsrController.getPreguntas);

router.post("/personajes/nuevo", isAuth, hsrController.postNuevoPersonaje);
router.post("/personajes/editar", isAuth, hsrController.postEditarPersonaje);

module.exports = router;
