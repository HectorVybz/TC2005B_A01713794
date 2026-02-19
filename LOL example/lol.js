//document es el prototipo que contiene el DOM (Document Object Model)
//console.log(document);
const gwen = {
    nombre: "Gwen",
    descripcion: "Gwen, la costurera magica",
    tipo: "Luchador",
    imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg"
}
const div_gwen = document.getElementById("gwen");
console.log(div_gwen);

div_gwen.onclick =() => {
    div_gwen.innerHTML = `
     <p class="is-size-2">${gwen.nombre}</p>
     <p>${gwen.descripcion}</p>
     <span class="tag">${gwen.tipo}</span>
    `;
}