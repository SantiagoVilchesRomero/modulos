import { Game } from './modules/game.js';

let game = new Game();
let nombre = game.player.name;
let saludo = document.getElementById("saludo");
saludo.textContent = "Hola " + nombre;
let cartas = document.getElementById("numbers");
let resultado = document.getElementById("resultado");

let random = () => {
    return Math.floor(Math.random() * 11) + 1
};

let contador = 0;

for (let index = 0; index <= 4; index++) {
    let random2 = random();
    console.log(contador + ' + ' + random2);
    contador = contador + random2
    if (contador == 21) {
        resultado.textContent = "¡Has Ganado!";
        index = 5
    } else if ((contador < 21 && index  == 4) || contador > 21) {
        resultado.textContent = "¡Has Perdido!";
        index = 5
    }
    console.log(contador);
}

