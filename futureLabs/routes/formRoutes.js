const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

function pagina(titulo, contenido) {
  return `
  <!doctype html>
  <html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${titulo}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body class="bg-dark text-light">

    <nav class="navbar navbar-expand-lg navbar-dark bg-black">
      <div class="container">
        <a class="navbar-brand" href="/inicio">HSR Express</a>
        <div class="navbar-nav">
          <a class="nav-link" href="/inicio">Inicio</a>
          <a class="nav-link" href="/personajes">Personajes</a>
          <a class="nav-link" href="/facciones">Facciones</a>
          <a class="nav-link" href="/galeria">Galería</a>
          <a class="nav-link" href="/contacto">Contacto</a>
          <a class="nav-link" href="/preguntas">Pregunta</a>
        </div>
      </div>
    </nav>

    <main class="container py-4">
      ${contenido}
    </main>

  </body>
  </html>
  `;
}

router.get("/contacto", (req, res) => {
  res.send(pagina("Contacto", `
    <h1>Contacto</h1>
    <p>Esta forma envía datos por POST y el servidor los guarda en un archivo de texto.</p>

    <form action="/enviar" method="post" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Nombre</label>
        <input name="nombre" class="form-control" required>
      </div>

      <div class="col-md-6">
        <label class="form-label">Personaje favorito</label>
        <select name="personaje" class="form-select" required>
          <option value="">Selecciona uno</option>
          <option>Kafka</option>
          <option>Acheron</option>
          <option>Jingliu</option>
          <option>Dan Heng IL</option>
          <option>Trailblazer</option>
        </select>
      </div>

      <div class="col-12">
        <label class="form-label">Mensaje</label>
        <textarea name="mensaje" class="form-control" rows="4" required></textarea>
      </div>

      <div class="col-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
      </div>
    </form>
  `));
});

router.post("/enviar", (req, res) => {
  const { nombre, personaje, mensaje } = req.body;

  if (!nombre || !personaje || !mensaje) {
    return res.status(400).send(pagina("Error", `
      <h1>Error 400</h1>
      <p>Faltan campos en el formulario.</p>
      <a href="/contacto" class="btn btn-outline-light">Volver</a>
    `));
  }

  const carpeta = path.join(__dirname, "..", "data");
  if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta);
  }

  const archivo = path.join(carpeta, "mensajes.txt");

  const texto =
    `---\n` +
    `Fecha: ${new Date().toLocaleString()}\n` +
    `Nombre: ${nombre}\n` +
    `Personaje favorito: ${personaje}\n` +
    `Mensaje: ${mensaje}\n`;

  fs.appendFileSync(archivo, texto, "utf8");

  res.send(pagina("Enviado", `
    <h1>¡Mensaje guardado!</h1>
    <p>Gracias <strong>${nombre}</strong>, tu información se guardó correctamente.</p>
    <a href="/inicio" class="btn btn-outline-light">Volver al inicio</a>
  `));
});

module.exports = router;