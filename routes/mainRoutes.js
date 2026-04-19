const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const hsrController = require("../controllers/hsrController");
const hasPermission = require("../middleware/has-permission");

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, "..", "uploads"));
    },
    filename: (request, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const cleanName = path
            .basename(file.originalname, extension)
            .replace(/[^a-zA-Z0-9_-]/g, "-")
            .replace(/-+/g, "-")
            .substring(0, 50) || "imagen";

        callback(null, Date.now() + "-" + cleanName + extension);
    }
});

const fileFilter = (request, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (allowedTypes.includes(file.mimetype)) {
        return callback(null, true);
    }

    return callback(new Error("TIPO_ARCHIVO_INVALIDO"));
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

router.get("/", (req, res) => {
    res.redirect("/inicio");
});

router.get("/inicio", hsrController.getInicio);
router.get("/personajes", hsrController.getPersonajes);
router.post("/personajes/buscar", hsrController.postBuscarPersonajes);
router.get("/personajes/nuevo", hasPermission("personajes_crear"), hsrController.getNuevoPersonaje);
router.get("/personajes/editar/:id", hasPermission("personajes_editar"), hsrController.getEditarPersonaje);
router.get("/personajes/:id", hsrController.getPersonajeDetalle);
router.get("/facciones", hsrController.getFacciones);
router.get("/galeria", hsrController.getGaleria);
router.get("/preguntas", hsrController.getPreguntas);

router.post("/personajes/nuevo", hasPermission("personajes_crear"), upload.single("img"), hsrController.postNuevoPersonaje);
router.post("/personajes/editar", hasPermission("personajes_editar"), upload.single("img"), hsrController.postEditarPersonaje);

module.exports = router;
