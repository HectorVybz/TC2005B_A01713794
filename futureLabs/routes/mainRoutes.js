const express = require("express");
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
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
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

// Ruta 1
router.get("/", (req, res) => {
  res.redirect("/inicio");
});

// Ruta 2
router.get("/inicio", (req, res) => {
  res.send(pagina("Inicio", `
    <div class="row align-items-center g-4">
      <div class="col-md-6">
        <h1>Bienvenido a Honkai: Star Rail</h1>
        <p>Este sitio fue hecho con Express reutilizando la idea del Lab 10.</p>
        <p>Aquí practicamos rutas, formularios, módulos y archivos estáticos.</p>
      </div>
      <div class="col-md-6 text-center">
        <img src="/images/trailblazer.webp" class="img-fluid rounded shadow" alt="Trailblazer" style="max-width: 400px;">
      </div>
    </div>
  `));
});

// Ruta 3
router.get("/personajes", (req, res) => {
  res.send(pagina("Personajes", `
    <h1 class="mb-4">Personajes</h1>

    <div class="row g-3">
      <div class="col-md-4">
        <div class="card bg-secondary text-light h-100">
          <img src="/images/kafka.webp" class="card-img-top" alt="Kafka">
          <div class="card-body">
            <h5 class="card-title">Kafka</h5>
            <p class="card-text">Una de las miembros más icónicas de los Stellaron Hunters.</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card bg-secondary text-light h-100">
          <img src="/images/acheron.webp" class="card-img-top" alt="Acheron">
          <div class="card-body">
            <h5 class="card-title">Acheron</h5>
            <p class="card-text">Un personaje muy fuerte, misterioso y de tipo Nihility.</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card bg-secondary text-light h-100">
          <img src="/images/jingliu.webp" class="card-img-top" alt="Jingliu">
          <div class="card-body">
            <h5 class="card-title">Jingliu</h5>
            <p class="card-text">Espadachina elegante y peligrosa.</p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card bg-secondary text-light h-100">
          <img src="/images/dan_heng_il.webp" class="card-img-top" alt="Dan Heng IL">
          <div class="card-body">
            <h5 class="card-title">Dan Heng • Imbibitor Lunae</h5>
            <p class="card-text">Versión poderosa de Dan Heng, con gran daño y uno de los diseños más llamativos.</p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card bg-secondary text-light h-100">
          <img src="/images/trailblazer.webp" class="card-img-top" alt="Trailblazer">
          <div class="card-body">
            <h5 class="card-title">Trailblazer</h5>
            <p class="card-text">El protagonista del Astral Express y centro de la historia.</p>
          </div>
        </div>
      </div>
    </div>
  `));
});

// Ruta 4
router.get("/facciones", (req, res) => {
  res.send(pagina("Facciones", `
    <h1 class="mb-4">Facciones</h1>

    <div class="row g-3">

      <div class="col-md-6">
        <div class="card bg-secondary text-light h-100">
          <img src="/images/astral_express.webp" class="card-img-top" alt="Astral Express">
          <div class="card-body">
            <h5 class="card-title">Astral Express</h5>
            <p class="card-text">
              El grupo principal de la historia. Viajan entre mundos resolviendo problemas relacionados con los Stellaron.
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card bg-secondary text-light h-100">
          <img src="/images/stellaron_hunters.webp" class="card-img-top" alt="Stellaron Hunters">
          <div class="card-body">
            <h5 class="card-title">Stellaron Hunters</h5>
            <p class="card-text">
              Organización misteriosa con objetivos ocultos. Kafka es uno de sus miembros más conocidos.
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card bg-secondary text-light h-100">
          <img src="/images/xianzhou_luofu.webp" class="card-img-top" alt="Xianzhou Luofu">
          <div class="card-body">
            <h5 class="card-title">Xianzhou Luofu</h5>
            <p class="card-text">
              Una de las naves más importantes de la alianza Xianzhou, con mucha relevancia en la historia de Dan Heng.
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card bg-secondary text-light h-100">
          <img src="/images/interastral_peace_corporation.webp" class="card-img-top" alt="Interastral Peace Corporation">
          <div class="card-body">
            <h5 class="card-title">Interastral Peace Corporation</h5>
            <p class="card-text">
              Corporación con gran influencia económica y política dentro del universo de Honkai: Star Rail.
            </p>
          </div>
        </div>
      </div>

    </div>
  `));
});

// Ruta 5
router.get("/galeria", (req, res) => {
  res.send(pagina("Galería", `
    <h1 class="mb-4">Galería</h1>
    <p class="mb-4">Aquí se muestran todas las imágenes principales del sitio: personajes y facciones.</p>

    <h2 class="h4 mb-3">Personajes</h2>
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <img src="/images/kafka.webp" class="img-fluid rounded shadow" alt="Kafka">
      </div>
      <div class="col-md-4">
        <img src="/images/acheron.webp" class="img-fluid rounded shadow" alt="Acheron">
      </div>
      <div class="col-md-4">
        <img src="/images/jingliu.webp" class="img-fluid rounded shadow" alt="Jingliu">
      </div>
      <div class="col-md-6">
        <img src="/images/dan_heng_il.webp" class="img-fluid rounded shadow" alt="Dan Heng IL">
      </div>
      <div class="col-md-6">
        <img src="/images/trailblazer.webp" class="img-fluid rounded shadow" alt="Trailblazer">
      </div>
    </div>

    <h2 class="h4 mb-3">Facciones</h2>
    <div class="row g-3">
      <div class="col-md-6">
        <img src="/images/astral_express.webp" class="img-fluid rounded shadow" alt="Astral Express">
      </div>
      <div class="col-md-6">
        <img src="/images/stellaron_hunters.webp" class="img-fluid rounded shadow" alt="Stellaron Hunters">
      </div>
      <div class="col-md-6">
        <img src="/images/xianzhou_luofu.webp" class="img-fluid rounded shadow" alt="Xianzhou Luofu">
      </div>
      <div class="col-md-6">
        <img src="/images/interastral_peace_corporation.webp" class="img-fluid rounded shadow" alt="Interastral Peace Corporation">
      </div>
    </div>
  `));
});

// Ruta 6
router.get("/preguntas", (req, res) => {
  res.send(pagina("Pregunta del laboratorio", `
    <h1>Pregunta del laboratorio</h1>
    <h2 class="h5">Describe el archivo package.json</h2>
    <p>
      El archivo <code>package.json</code> es el archivo de configuración principal de un proyecto Node.js.
      Contiene información como el nombre del proyecto, versión, archivo principal, scripts y dependencias.
      En este laboratorio permite registrar a Express como dependencia y definir comandos como
      <code>npm start</code> para ejecutar el servidor y <code>npm run dev</code> para trabajar en modo desarrollo.
    </p>
  `));
});

module.exports = router;