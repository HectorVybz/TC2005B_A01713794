const express = require("express");
const path = require("path");

const mainRoutes = require("./routes/mainRoutes");
const formRoutes = require("./routes/formRoutes");

const app = express();
const PORT = 3000;

// Middleware para leer formularios
app.use(express.urlencoded({ extended: false }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/", mainRoutes);
app.use("/", formRoutes);

// 404
app.use((req, res) => {
  res.status(404).send(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>404</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="bg-dark text-light">
      <div class="container py-5">
        <h1>404 - Ruta no encontrada</h1>
        <p>La ruta que intentaste abrir no existe.</p>
        <a href="/inicio" class="btn btn-outline-light">Volver al inicio</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});