// =======================================
// Lab 8 - Servidor web con Node (HTTP)
// =======================================

const http = require("http");
const fs = require("fs");
const path = require("path");

// Helper para servir archivos
function servirArchivo(res, rutaArchivo) {
  fs.readFile(rutaArchivo, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 - Archivo no encontrado");
      return;
    }

    // Content-Type básico
    const ext = path.extname(rutaArchivo).toLowerCase();
    const tipos = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif"
    };

    res.writeHead(200, { "Content-Type": tipos[ext] || "application/octet-stream" });
    res.end(data);
  });
}

// Server
const server = http.createServer((req, res) => {
  console.log("Petición:", req.method, req.url);

  // Ruta raíz -> manda el index.html de mis labs (copiado en /public)
  if (req.url === "/" || req.url === "/index") {
    const archivo = path.join(__dirname, "public", "index.html");
    servirArchivo(res, archivo);
    return;
  }

  // Servir recursos estáticos (css, imágenes, etc.) desde /public
  // Ej: /styles.css, /Yo.jpeg
  const ruta = path.join(__dirname, "public", req.url);

  // Evitar escapes raros
  if (!ruta.startsWith(path.join(__dirname, "public"))) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("400 - Ruta inválida");
    return;
  }

  servirArchivo(res, ruta);
});

// Puerto
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
