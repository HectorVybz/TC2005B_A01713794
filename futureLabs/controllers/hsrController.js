const PersonajeModel = require("../models/personajeModel");

exports.getInicio = (req, res) => {
    res.render("inicio");
};

exports.getPersonajes = (req, res) => {
    const personajes = PersonajeModel.fetchAllPersonajes();
    res.render("personajes", { personajes });
};

exports.getFacciones = (req, res) => {
    const facciones = PersonajeModel.fetchAllFacciones();
    res.render("facciones", { facciones });
};

exports.getGaleria = (req, res) => {
    const personajes = PersonajeModel.fetchAllPersonajes();
    const facciones = PersonajeModel.fetchAllFacciones();
    res.render("galeria", { personajes, facciones });
};

exports.getPreguntas = (req, res) => {
    res.render("preguntas");
};

exports.getContacto = (req, res) => {
    res.render("contacto");
};

exports.postEnviar = (req, res) => {
    const nombre = req.body.nombre;
    const personaje = req.body.personaje;
    const mensaje = req.body.mensaje;

    res.render("respuesta", {
        nombre,
        personaje,
        mensaje
    });
};