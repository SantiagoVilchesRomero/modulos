import { UI_BUILDER } from "./Ui.js";
import { ELEMENTS } from "./entities/Board.js";
import { Player } from "./entities/Player.js";
import { ConnectionHandler } from "./services/ConnectionHandler.js";
import { GameService } from "./services/GameService.js";

export const UIv1 = UI_BUILDER.init();
let currentPlayer;
let gameService;

UIv1.setGameService = (service) => {
    gameService = service;
};

UIv1.initUI = () => {
    const base = document.getElementById(UIv1.uiElements.board);
    base.classList.add("board");
    document.getElementById("moveBtn").addEventListener("click", () => {
        console.log("Acción: Mover");
        currentPlayer = ConnectionHandler.socket.id;

        // Obtener la dirección actual del jugador
        const currentDirection = gameService?.currentPlayer?.direction || "left";
        console.log("Moviéndome en dirección: " + currentDirection);

        ConnectionHandler.socket.emit("message", {
            type: "MOVE",
            content: {
                id: currentPlayer,
                direction: currentDirection
            }
        });
    });
    document.getElementById("rotateBtn").addEventListener("click", () => {
        console.log("Acción: Rotar");
        currentPlayer = ConnectionHandler.socket.id;

        // Obtener la dirección actual y calcular la siguiente
        const currentDirection = gameService?.currentPlayer?.direction || "left";
        const directions = ["up", "right", "down", "left"];
        const currentIndex = directions.indexOf(currentDirection);
        const nextIndex = (currentIndex + 1) % 4;
        const newDirection = directions[nextIndex];

        ConnectionHandler.socket.emit("message", {
            type: "ROTATE",
            content: {
                id: currentPlayer,
                newDirection: newDirection
            }
        });
    });
    document.getElementById("shootBtn").addEventListener("click", () => {
        console.log("Acción: Disparar");
    });
}

let persistentBushPositions = [];

UIv1.drawBoard = (board) => {
    if (board !== undefined) {
        const base = document.getElementById(UIv1.uiElements.board);
        base.innerHTML = '';
        base.style.gridTemplateColumns = `repeat(${board.length}, 100px)`;
        base.style.gridTemplateRows = `repeat(${board.length}, 100px)`;
        
        // Reiniciar las posiciones de arbustos
        persistentBushPositions = [];
        
        board.forEach((row, rowIndex) => row.forEach((element, colIndex) => {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            base.appendChild(tile);
            if (element === ELEMENTS.bush) {
                tile.style.backgroundColor = 'green';
                tile.textContent = '🌳';
                
                // Guardar posición del arbusto (usando el índice en el grid)
                const index = rowIndex * board.length + colIndex;
                persistentBushPositions.push(index);
            }
            anime({
                targets: tile,
                opacity: 1,
            });
        }));
    }
}


UIv1.drawPlayers = (players, boardSize) => {
    console.log("Drawing players:", players);
    console.log("Board size:", boardSize);

    const base = document.getElementById(UIv1.uiElements.board);
    if (!base || !base.children || base.children.length === 0) {
        console.error("Board container not found or empty");
        return;
    }

    // Clear all cells - be thorough with the cleanup
    Array.from(base.children).forEach((tile) => {
        tile.textContent = '';
        tile.classList.remove("player", "current-player");
        tile.classList.remove("facing-up", "facing-right", "facing-down", "facing-left");
        tile.style.border = "";
        tile.style.boxShadow = "";
        tile.style.zIndex = "";
        tile.style.fontSize = "";
        tile.style.opacity = "1"; // Reset to fully visible
        tile.style.backgroundColor = "";
    });

    // Restore bushes from our persistent array instead of rediscovering them
    persistentBushPositions.forEach(index => {
        if (index >= 0 && index < base.children.length) {
            const tile = base.children[index];
            tile.textContent = '🌳';
            tile.style.backgroundColor = 'green';
        }
    });

    // Draw players - with careful index calculation
    players.forEach(player => {
        // Rest of player drawing code remains unchanged...
        // [Existing player drawing code]
        
        // Ensure x and y are numbers
        const x = Number(player.x);
        const y = Number(player.y);

        // Verify player has valid position
        if (isNaN(x) || isNaN(y) || x < 0 || y < 0 || x >= boardSize || y >= boardSize) {
            console.error("Invalid player position:", player);
            return;
        }

        const isCurrentPlayer = gameService?.currentPlayer &&
            player.identifier === gameService.currentPlayer.identifier;

        // Skip invisible players unless they are the current player
        if (!player.visibility && !isCurrentPlayer) {
            return;
        }

        const index = x * boardSize + y;
        if (index < 0 || index >= base.children.length) {
            console.error("Player position out of bounds:", index, "max:", base.children.length);
            return;
        }

        const tile = base.children[index];
        if (!tile) {
            console.error("Tile not found at index:", index);
            return;
        }

        // Check if this tile has a bush
        const isBush = persistentBushPositions.includes(index);

        // Choose emoji based on direction
        let playerEmoji = '🚶';
        switch (player.direction) {
            case "up": playerEmoji = '⬆️'; break;
            case "right": playerEmoji = '➡️'; break;
            case "down": playerEmoji = '⬇️'; break;
            case "left": playerEmoji = '⬅️'; break;
        }

        // Only replace bush if player is visible or it's the current player
        if (!isBush || (isBush && isCurrentPlayer)) {
            tile.textContent = playerEmoji;
        }

        // Add styling classes
        tile.classList.add("player");
        tile.style.fontSize = '30px';

        // Highlight current player
        if (isCurrentPlayer) {
            tile.classList.add("current-player");
            if (!player.visibility) {
                tile.style.opacity = "0.7"; // Make semi-transparent if hidden
            }
        }
    });
};

