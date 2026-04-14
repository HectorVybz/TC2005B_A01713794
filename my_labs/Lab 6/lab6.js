// Lab 6 - Programación orientada a eventos
// Opción A: Validador de password

// --------- Helpers DOM ----------
const $ = (id) => document.getElementById(id);

const form = $("formPass");
const pass1 = $("pass1");
const pass2 = $("pass2");
const hint1 = $("hint1");
const hint2 = $("hint2");
const resultado = $("resultado");
const textoDemo = $("textoDemo");
const btnAuto = $("btnAuto");

// --------- Validaciones ----------
function tieneMayus(texto) {
  return /[A-Z]/.test(texto);
}

function tieneNumero(texto) {
  return /[0-9]/.test(texto);
}

function tieneSimbolo(texto) {
  // símbolo básico
  return /[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|]/.test(texto);
}

function validarReglas(password) {
  const errores = [];

  if (password.length < 8) errores.push("Debe tener mínimo 8 caracteres.");
  if (!tieneMayus(password)) errores.push("Debe incluir al menos 1 mayúscula.");
  if (!tieneNumero(password)) errores.push("Debe incluir al menos 1 número.");
  if (!tieneSimbolo(password)) errores.push("Debe incluir al menos 1 símbolo (ej. !@#$).");

  return errores;
}

// --------- Ayuda dinámica (EVENTOS) ----------
// Evento: input 
pass1.addEventListener("input", () => {
  const errores = validarReglas(pass1.value);

  if (pass1.value.length === 0) {
    hint1.className = "hint text-muted mt-1";
    hint1.textContent = "Tip: usa al menos 8 caracteres, 1 mayúscula, 1 número y 1 símbolo.";
    return;
  }

  if (errores.length === 0) {
    hint1.className = "hint ok mt-1";
    hint1.textContent = "Se ve bien: cumple reglas básicas.";
  } else {
    hint1.className = "hint bad mt-1";
    hint1.textContent = "Falta: " + errores[0];
  }
});

// Evento: input para comparar contraseñas
pass2.addEventListener("input", () => {
  if (pass2.value.length === 0) {
    hint2.className = "hint text-muted mt-1";
    hint2.textContent = "Tip: debe coincidir exactamente con la primera.";
    return;
  }

  if (pass2.value === pass1.value) {
    hint2.className = "hint ok mt-1";
    hint2.textContent = "Coinciden.";
  } else {
    hint2.className = "hint bad mt-1";
    hint2.textContent = "No coinciden todavía.";
  }
});

// --------- Cambiar estilo con eventos distintos a onclick ----------
// Evento: mouseover
textoDemo.addEventListener("mouseover", () => {
  textoDemo.classList.add("bigText", "mono");
});

// Evento: dblclick
textoDemo.addEventListener("dblclick", () => {
  textoDemo.classList.remove("bigText", "mono");
});

// --------- Submit de la forma (EVENTO submit) ----------
form.addEventListener("submit", (e) => {
  e.preventDefault(); // no enviamos a servidor (solo lab)

  const p1 = pass1.value;
  const p2 = pass2.value;

  const errores = validarReglas(p1);

  if (p1.length === 0 || p2.length === 0) {
    mostrarResultado("warning", "Completa ambos campos antes de validar.");
    return;
  }

  if (errores.length > 0) {
    mostrarResultado("danger", "Contraseña inválida: " + errores.join(" "));
    return;
  }

  if (p1 !== p2) {
    mostrarResultado("danger", "Las contraseñas no coinciden.");
    return;
  }

  mostrarResultado("success", "Contraseña válida. (Aún así, en un sistema real se valida también en servidor)");
});

// --------- Reset (evento reset + setTimeout opcional) ----------
form.addEventListener("reset", () => {
  setTimeout(() => {
    hint1.className = "hint text-muted mt-1";
    hint1.textContent = "Tip: usa al menos 8 caracteres, 1 mayúscula, 1 número y 1 símbolo.";

    hint2.className = "hint text-muted mt-1";
    hint2.textContent = "Tip: debe coincidir exactamente con la primera.";

    mostrarResultado("secondary", "Aquí verás el resultado de la validación.");
  }, 50);
});

// --------- Botón extra (onclick permitido) ----------
btnAuto.addEventListener("click", () => {
  // ejemplo que cumple reglas
  pass1.value = "TecLab6!2026";
  pass2.value = "TecLab6!2026";

  pass1.dispatchEvent(new Event("input"));
  pass2.dispatchEvent(new Event("input"));

  mostrarResultado("info", "Se generó un ejemplo automáticamente. Ahora presiona 'Validar'.");
});

// --------- UI helper ----------
function mostrarResultado(tipo, mensaje) {
  resultado.className = "alert alert-" + tipo;
  resultado.textContent = mensaje;

  // Opcional: mensaje temporal (setTimeout)
  if (tipo === "success") {
    setTimeout(() => {
      resultado.className = "alert alert-secondary";
      resultado.textContent = "Tip: prueba con otra contraseña para ver la validación en acción.";
    }, 5000);
  }
}
