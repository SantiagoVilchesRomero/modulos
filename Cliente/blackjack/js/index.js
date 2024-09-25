import { Game } from './modules/game.js';

let game = new Game();
let nombre = game.player.name;
let saludo = document.getElementById("saludo");
saludo.textContent = "Hola " + nombre;