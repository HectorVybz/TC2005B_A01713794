const express = require("express");
const router = express.Router();

router.get("/contacto", (req, res) => {
    res.render("contacto");
});

router.post("/enviar", (req, res) => {
    const nombre = req.body.nombre;
    const personaje = req.body.personaje;
    const mensaje = req.body.mensaje;

    res.render("respuesta", {
        nombre,
        personaje,
        mensaje
    });
});

module.exports = router;