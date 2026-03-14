const PersonajeModel = require("../models/personajeModel");

exports.getInicio = (req, res) => {
    let personajeFavorito = "No definido";

    if (req.headers.cookie) {
        const cookies = req.headers.cookie.split(";").map(cookie => cookie.trim());
        const personajeCookie = cookies.find(cookie => cookie.startsWith("personajeFavorito="));

        if (personajeCookie) {
            personajeFavorito = decodeURIComponent(personajeCookie.split("=")[1]);
        }
    }

    res.render("inicio", {
        nombreSesion: req.session.nombreUsuario || null,
        personajeCookie: personajeFavorito
    });
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

    req.session.nombreUsuario = nombre;
    req.session.mensajeUsuario = mensaje;

    res.setHeader("Set-Cookie", `personajeFavorito=${encodeURIComponent(personaje)}; HttpOnly`);

    res.render("respuesta", {
        nombre,
        personaje,
        mensaje
    });
};

exports.getLogout = (req, res) => {
    req.session.destroy(() => {
        res.setHeader("Set-Cookie", "personajeFavorito=; Max-Age=0; HttpOnly");
        res.redirect("/inicio");
    });
};