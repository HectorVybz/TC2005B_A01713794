console.log("hola desde node!");

const filesystem = require('fd');   

filesystem.writeFileSync('hola.txt', 'Hola desde node');

setTimeout(() => {
    console.log("jojo te hackie");
}, 15000);

const arreglo = [5000, 60, 90, 100, 10, 20, 10000, 0, 120, 2000, 340, 1000, 50];

for (let item of arreglo) {
    setTimeout(() => {
        console.log(item);
    }, item);
}