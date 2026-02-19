// consola (log, into, warn, error, assert)
console.log("hola mundo!");
console.info("Creado en el 2009");
console.warn("Es adictivo");
console.error("Vanguars");

//== ---> Operador de comparacion de valores
console.assert(1 == true);

//=== ---> Operador"estrictamente igual" de comparacion de valor y tipo
console.assert(1 === true);


//-----------------variables, constantes------------------

//Forma antigua de declarar variables. 
//Tiene mayor alcance por lo que no se recomienda
var personaje_1 = "Gwen";

//Forma moderna de declarar varfiables.
//La variable solo vive dentro del bloque de codigo donde se declara
let personaje_2 = "Mordekaiser";

//Declarar constantantes con const
const precio_skin = 300;

//Alcance de las variables
{
    var personaje_3 = "Jax";
    let personaje_4 = "Garen";
}

console.log(personaje_3);
//La siguiente linea genera un error porque personaje_4 murio hace 3 lineas.
//console.log(personaje_4);


//-----------------alert, prompt, confirm
alert("No juegues esto por favor");

const personaje_favorito = prompt("Cual es tu personaje favorito?");
console.info("Personaje favorito: " + personaje_favorito);

const hoy_hay_juego = confirm("Un jueguito?");``


//-----------------funciones tradicionales
function descargar() {
    window.location.href = "https://www.leagueoflegends.com/es-mx/download/";
}

if (hoy_hay_juego) {
    descargar();
} else {
    console.info("Buen dia");
}

// funciones modernas
() => {}

document.getElementById("boton_desinstalar").onclick = () => {
    alert("jojojo no se puede desinstalar");
}

const iniciar_partida = () => {
    alert("Iniciando partida...");
}

iniciar_partida();


//-----------------arreglos

const arreglo = ["Elemento"];

const arreglo2 = new Array();

arreglo.push("Irelia");
personaje[10] = "Leona";

//arreglos asociativos
personajes["hola"] = "Lux";

//recorrido tradicional del arreglo
for (let i = 0; i < personajes.length; i++) {
    console.log(personajes[i]);
}

//recorridos alternativos del arreglo
for (let personaje of personajes) {
    console.log(personaje);
}


//Objetos
const eco_de_Luden = {
    nombre: "Eco de Luden",
    color: "morado",
    dmg: 100
};

console.log(eco_de_Luden);

