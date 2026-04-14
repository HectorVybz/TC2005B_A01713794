// Lab 10 - Rutas y formas (Honkai: Star Rail)
// Node sin frameworks: rutas + POST + guardar en txt + estáticos (imágenes)

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 3000;

function send(res, status, contentType, body) {
  res.writeHead(status, { "Content-Type": contentType });
  res.end(body);
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, "text/plain; charset=utf-8", "404 - Archivo no encontrado");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const types = {     
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".webp": "image/webp"
    };

    send(res, 200, types[ext] || "application/octet-stream", data);
  });
}

function parseForm(body) {
  const params = new URLSearchParams(body);
  return Object.fromEntries(params.entries());
}

function ensureDataFolder() {
  const folder = path.join(__dirname, "data");
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  return folder;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const route = parsedUrl.pathname;

  console.log(`[${new Date().toISOString()}] ${req.method} ${route}`);

  // ========== 1) Servir archivos estáticos desde /public ==========
  if (req.method === "GET") {
    const staticPath = path.join(__dirname, "public", route);

    // Seguridad básica: evita que se salgan de /public con rutas raras
    const publicRoot = path.join(__dirname, "public");
    if (!staticPath.startsWith(publicRoot)) {
      return send(res, 400, "text/plain; charset=utf-8", "400 - Ruta inválida");
    }

    if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
      return serveFile(res, staticPath);
    }
  }

  // ========== 2) Rutas GET ==========
  if (req.method === "GET" && (route === "/" || route === "/inicio")) {
    return serveFile(res, path.join(__dirname, "public", "index.html"));
  }

  if (req.method === "GET" && route === "/personajes") {
    return serveFile(res, path.join(__dirname, "public", "personajes.html"));
  }

  if (req.method === "GET" && route === "/contacto") {
    return serveFile(res, path.join(__dirname, "public", "contacto.html"));
  }

  // ========== 3) Ruta POST (forma) ==========
  if (req.method === "POST" && route === "/enviar") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
      if (body.length > 1e6) req.socket.destroy();
    });

    req.on("end", () => {
      const data = parseForm(body);

      const nombre = (data.nombre || "").trim();
      const personaje = (data.personaje || "").trim();
      const mensaje = (data.mensaje || "").trim();

      if (!nombre || !personaje || !mensaje) {
        return send(
          res,
          400,
          "text/html; charset=utf-8",
          `<h1>Error 400</h1>
           <p>Faltan campos. Regresa y completa el formulario.</p>
           <a href="/contacto">Volver</a>`
        );
      }

      const folder = ensureDataFolder();
      const file = path.join(folder, "mensajes.txt");

      const linea =
        `---\n` +
        `Fecha: ${new Date().toLocaleString()}\n` +
        `Nombre: ${nombre}\n` +
        `Personaje favorito: ${personaje}\n` +
        `Mensaje: ${mensaje}\n`;

      fs.appendFile(file, linea, (err) => {
        if (err) {
          return send(res, 500, "text/plain; charset=utf-8", "500 - No se pudo guardar el archivo");
        }

        return send(
          res,
          200,
          "text/html; charset=utf-8",
          `<h1>¡Mensaje guardado!</h1>
           <p>Gracias, <strong>${nombre}</strong>. Tu mensaje se guardó en el servidor.</p>
           <p><a href="/inicio">Volver al inicio</a> | <a href="/contacto">Enviar otro</a></p>`
        );
      });
    });

    return;
  }

  // ========== 4) 404 ==========
  send(res, 404, "text/html; charset=utf-8", `
    <h1>404 - Ruta no encontrada</h1>
    <p>La ruta <strong>${route}</strong> no existe.</p>
    <a href="/inicio">Ir al inicio</a>
  `);
});

server.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});