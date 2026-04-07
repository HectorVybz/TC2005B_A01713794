const PersonajeModel = require("../models/personajeModel");

const handleDbError = (res, err) => {
    console.log(err);
    return res.status(500).send("Error al conectar con la base de datos. Revisa util/database.js y tus credenciales de MySQL.");
};

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
    PersonajeModel.fetchAll()
        .then(([rows, fieldData]) => {
            res.render("personajes", { personajes: rows });
        })
        .catch(err => {
            return handleDbError(res, err);
        });
};

exports.getPersonajeDetalle = (req, res) => {
    const id = req.params.id;

    PersonajeModel.fetchOne(id)
        .then(([rows, fieldData]) => {
            if (rows.length === 0) {
                return res.status(404).render("404");
            }

            res.render("detallePersonaje", { personaje: rows[0] });
        })
        .catch(err => {
            return handleDbError(res, err);
        });
};

exports.getNuevoPersonaje = (req, res) => {
    res.render("nuevoPersonaje");
};

exports.postNuevoPersonaje = (req, res) => {
    const nombre = req.body.nombre;
    const img = req.body.img;
    const descripcion = req.body.descripcion;

    const personaje = new PersonajeModel(nombre, img, descripcion);

    personaje.save()
        .then(() => {
            res.redirect("/personajes");
        })
        .catch(err => {
            return handleDbError(res, err);
        });
};

exports.getEditarPersonaje = (req, res) => {
    const id = req.params.id;

    PersonajeModel.fetchOne(id)
        .then(([rows, fieldData]) => {
            if (rows.length === 0) {
                return res.status(404).render("404");
            }

            res.render("editarPersonaje", { personaje: rows[0] });
        })
        .catch(err => {
            return handleDbError(res, err);
        });
};

exports.postEditarPersonaje = (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const img = req.body.img;
    const descripcion = req.body.descripcion;

    PersonajeModel.update(id, nombre, img, descripcion)
        .then(() => {
            res.redirect("/personajes/" + id);
        })
        .catch(err => {
            return handleDbError(res, err);
        });
};

exports.getFacciones = (req, res) => {
    const facciones = [
        {
            nombre: "Astral Express",
            img: "astral_express.webp",
            descripcion: "El Astral Express es el grupo principal de exploradores que viaja entre mundos siguiendo la ruta trazada por Akivili."
        },
        {
            nombre: "Stellaron Hunters",
            img: "stellaron_hunters.webp",
            descripcion: "Los Stellaron Hunters son una organización enigmática cuyas acciones parecen caóticas, aunque siguen un plan muy calculado."
        },
        {
            nombre: "Xianzhou Luofu",
            img: "xianzhou_luofu.webp",
            descripcion: "La Xianzhou Luofu es una de las naves de la alianza Xianzhou, con una cultura marcada por la inmortalidad y la disciplina."
        },
        {
            nombre: "Interastral Peace Corporation",
            img: "interastral_peace_corporation.webp",
            descripcion: "La Interastral Peace Corporation es una poderosa entidad económica con influencia política, tecnológica y comercial en toda la galaxia."
        }
    ];

    res.render("facciones", { facciones });
};

exports.getGaleria = (req, res) => {
    PersonajeModel.fetchAll()
        .then(([rows, fieldData]) => {
            const facciones = [
                { nombre: "Astral Express", img: "astral_express.webp" },
                { nombre: "Stellaron Hunters", img: "stellaron_hunters.webp" },
                { nombre: "Xianzhou Luofu", img: "xianzhou_luofu.webp" },
                { nombre: "Interastral Peace Corporation", img: "interastral_peace_corporation.webp" }
            ];

            res.render("galeria", { personajes: rows, facciones });
        })
        .catch(err => {
            return handleDbError(res, err);
        });
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
