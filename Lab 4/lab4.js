// Lab 4 - Fundamentos de JavaScript
// Tema distinto: Playlist


// -------------------- P1 --------------------
function problema1() {
  const entrada = prompt("Problema 1: Ingresa un entero positivo (>=1):");
  const n = Number(entrada);

  if (!Number.isInteger(n) || n < 1) {
    alert("Entrada inválida. Debe ser un entero >= 1.");
    return;
  }

  // REQUERIMIENTO: usar document.write para producir salida
  document.write("<h1>Problema 1 - Tabla del 1 al " + n + "</h1>");
  document.write("<table border='1' cellpadding='6' cellspacing='0'>");
  document.write("<tr><th>N</th><th>Cuadrado</th><th>Cubo</th></tr>");

  for (let i = 1; i <= n; i++) {
    document.write("<tr>");
    document.write("<td>" + i + "</td>");
    document.write("<td>" + (i * i) + "</td>");
    document.write("<td>" + (i * i * i) + "</td>");
    document.write("</tr>");
  }

  document.write("</table>");
}

// -------------------- P2 --------------------
function problema2() {
  const a = Math.floor(Math.random() * 90) + 10; // 10..99
  const b = Math.floor(Math.random() * 90) + 10; // 10..99

  const inicio = Date.now();
  const resp = prompt("Problema 2: ¿Cuánto es " + a + " + " + b + "?");
  const fin = Date.now();

  const out = document.getElementById("outP2");
  if (resp === null) {
    out.textContent = "Cancelaste el ejercicio.";
    return;
  }

  const tiempo = ((fin - inicio) / 1000).toFixed(2);
  const valor = Number(resp);
  const correcto = Number.isFinite(valor) && valor === (a + b);

  out.textContent =
    "Operación: " + a + " + " + b + "\n" +
    "Tu respuesta: " + resp + "\n" +
    "Resultado: " + (correcto ? "Correcto" : "Incorrecto (era " + (a + b) + ")") + "\n" +
    "Tiempo: " + tiempo + " segundos";
}

// -------------------- P3 --------------------
function contador(arr) {
  let negativos = 0;
  let ceros = 0;
  let positivos = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) negativos++;
    else if (arr[i] === 0) ceros++;
    else positivos++;
  }

  return { negativos, ceros, positivos };
}

// -------------------- P4 --------------------
function promedios(matriz) {
  const res = [];

  for (let i = 0; i < matriz.length; i++) {
    const fila = matriz[i];
    if (fila.length === 0) {
      res.push(NaN);
      continue;
    }

    let suma = 0;
    for (let j = 0; j < fila.length; j++) suma += fila[j];

    res.push(suma / fila.length);
  }

  return res;
}

// -------------------- P5 --------------------
function inverso(num) {
  const esNeg = num < 0;
  const texto = Math.abs(parseInt(num)).toString();
  const inv = Number(texto.split("").reverse().join(""));
  return esNeg ? -inv : inv;
}

// Pruebas automáticas
function correrPruebas() {
  const c1 = contador([-2, -1, 0, 0, 4, 9]);
  console.assert(c1.negativos === 2, "contador: negativos debería ser 2");
  console.assert(c1.ceros === 2, "contador: ceros debería ser 2");
  console.assert(c1.positivos === 2, "contador: positivos debería ser 2");

  const p1 = promedios([[10, 20, 30], [5, 5, 5, 5], [2, 8]]);
  console.assert(p1[0] === 20, "promedios: fila 1 debería ser 20");
  console.assert(p1[1] === 5, "promedios: fila 2 debería ser 5");
  console.assert(p1[2] === 5, "promedios: fila 3 debería ser 5");

  console.assert(inverso(12345) === 54321, "inverso: 12345 debería ser 54321");
  console.assert(inverso(1000) === 1, "inverso: 1000 debería ser 1");
  console.assert(inverso(-987) === -789, "inverso: -987 debería ser -789");
}

// Mostrar resultados 3-5 en HTML
function mostrarResultados345() {
  const out = document.getElementById("outP345");

  const ejCont = contador([-5, -1, 0, 3, 7, 0]);
  const ejProm = promedios([[7, 8, 9], [10, 10], [4, 6, 8, 10]]);
  const ejInv = inverso(12034);

  out.textContent =
    "contador([-5, -1, 0, 3, 7, 0]) => " + JSON.stringify(ejCont) + "\n" +
    "promedios([[7,8,9],[10,10],[4,6,8,10]]) => " + JSON.stringify(ejProm) + "\n" +
    "inverso(12034) => " + ejInv + "\n\n" +
    "Pruebas: revisa la consola para confirmar que todo pasó.";
}

// -------------------- P6 (Objeto) --------------------
class Cancion {
  constructor(titulo, artista, duracionSeg) {
    this.titulo = titulo;
    this.artista = artista;
    this.duracionSeg = duracionSeg;
  }

  duracionMin() {
    return (this.duracionSeg / 60).toFixed(2);
  }

  resumen() {
    return this.titulo + " - " + this.artista + " (" + this.duracionSeg + "s)";
  }
}

function mostrarPlaylist() {
  const out = document.getElementById("outP6");

  const playlist = [
    new Cancion("Blinding Lights", "The Weeknd", 200),
    new Cancion("Lose Yourself", "Eminem", 326),
    new Cancion("Take On Me", "a-ha", 225),
    new Cancion("Smells Like Teen Spirit", "Nirvana", 301)
  ];

  let filas = "";
  for (let i = 0; i < playlist.length; i++) {
    const c = playlist[i];
    filas +=
      "<tr>" +
        "<td>" + c.titulo + "</td>" +
        "<td>" + c.artista + "</td>" +
        "<td>" + c.duracionSeg + "</td>" +
        "<td>" + c.duracionMin() + "</td>" +
        "<td>" + c.resumen() + "</td>" +
      "</tr>";
  }

  out.innerHTML =
    "<div class='table-responsive'>" +
      "<table class='table table-bordered table-striped align-middle'>" +
        "<thead class='table-dark'>" +
          "<tr><th>Título</th><th>Artista</th><th>Seg</th><th>Min</th><th>Resumen</th></tr>" +
        "</thead>" +
        "<tbody>" + filas + "</tbody>" +
      "</table>" +
    "</div>";
}

// Inicializar
correrPruebas();

// Botones
document.getElementById("btnP1").addEventListener("click", problema1);
document.getElementById("btnP2").addEventListener("click", problema2);
document.getElementById("btnP345").addEventListener("click", mostrarResultados345);
document.getElementById("btnP6").addEventListener("click", mostrarPlaylist);
