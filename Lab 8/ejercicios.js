// =======================================
// Lab 8 - Introducción al back-end (Node)
// Hector Alejandro Barron Tamayo
// =======================================

const fs = require("fs");

// -----------------------------
// 1) Promedio de un arreglo
// -----------------------------
function promedio(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return 0;

  let suma = 0;
  for (let i = 0; i < arr.length; i++) {
    suma += arr[i];
  }
  return suma / arr.length;
}

// Prueba en consola
const nums = [10, 20, 30, 40];
console.log("1) Promedio de", nums, "=", promedio(nums));


// -----------------------------
// 2) Guardar un string en archivo (fs)
// -----------------------------
function guardarTexto(nombreArchivo, texto) {
  fs.writeFileSync(nombreArchivo, texto, "utf8");
  console.log(`2) Texto guardado en "${nombreArchivo}"`);
}

// Prueba en consola
guardarTexto("salida.txt", "Hola, este archivo lo creó Node usando el módulo fs.\n");


// -----------------------------
// 3) Problema extra (otro lenguaje -> JS)
//    Ejemplo: invertir un numero
// -----------------------------
function inverso(num) {
  const esNeg = num < 0;
  const texto = Math.abs(parseInt(num)).toString();
  const inv = Number(texto.split("").reverse().join(""));
  return esNeg ? -inv : inv;
}

// Prueba en consola
console.log("3) inverso(12034) =", inverso(12034));
console.log("3) inverso(-987) =", inverso(-987));
