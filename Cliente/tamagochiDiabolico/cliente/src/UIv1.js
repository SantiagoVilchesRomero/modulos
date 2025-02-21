import { UI_BUILDER } from "./Ui.js";
import { ELEMENTS } from "./entities/Board.js";
import { Player } from "./entities/Player.js";

export const UIv1 = UI_BUILDER.init();

UIv1.initUI = () => {
    const base = document.getElementById(UIv1.uiElements.board);
    base.classList.add("board");

    document.getElementById("moveBtn").addEventListener("click", () => {
        console.log("Acción: Mover");
        // Llamada a la función de movimiento
    });
    document.getElementById("rotateBtn").addEventListener("click", () => {
        console.log("Acción: Rotar");
        // Llamada a la función de rotación
    });
    document.getElementById("shootBtn").addEventListener("click", () => {
        console.log("Acción: Disparar");
        // Llamada a la función de disparo
    });
}

UIv1.drawBoard = (board) => {
    if (board !== undefined) {
        const base = document.getElementById(UIv1.uiElements.board);
        base.innerHTML = '';
        base.style.gridTemplateColumns = `repeat(${board.length}, 100px)`;
        base.style.gridTemplateRows = `repeat(${board.length}, 100px)`;
        board.forEach(element => element.forEach((element) => {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            base.appendChild(tile);
            if(element === ELEMENTS.bush) {
                tile.style.backgroundColor = 'green';
                tile.textContent = '🌳';
            }
            anime({
                targets: tile,
                opacity: 1,
            });
        }));
    }
}

UIv1.drawPlayers = (players, boardSize) => {
    const base = document.getElementById(UIv1.uiElements.board);
    players.forEach(player => {
        const index = player.x * boardSize + player.y;
        const tile = base.children[index];
        if (tile) {
            tile.textContent = '🚶';
            tile.style.fontSize = '30px';
            tile.classList.add("player");
        }
    });
};

