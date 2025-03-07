import { UI_BUILDER } from "./Ui.js";
import { ELEMENTS } from "./entities/Board.js";
import { Player } from "./entities/Player.js";
import { ConnectionHandler } from "./services/ConnectionHandler.js";
import { GameService } from "./services/GameService.js";

export const UIv1 = UI_BUILDER.init();
let currentPlayer;
let gameService;
UIv1.gameStarted = false;

UIv1.setGameService = (service) => {
    gameService = service;
};

UIv1.initUI = () => {
    const base = document.getElementById(UIv1.uiElements.board);
    base.classList.add("board");

    // Deshabilitar botones inicialmente
    document.getElementById("moveBtn").disabled = true;
    document.getElementById("rotateBtn").disabled = true;
    document.getElementById("shootBtn").disabled = true;

    UIv1.showMessage("Esperando a que se conecten más jugadores (0/4)...");

    // Agregar event listener para controles de teclado
document.addEventListener("keydown", (event) => {
    // No procesar si el juego no ha comenzado
    if (!UIv1.gameStarted) {
        UIv1.showMessage("Esperando a que se conecten más jugadores...");
        return;
    }
    
    // Verificar si el jugador está muerto
    if (gameService?.currentPlayer?.state === 4) {
        return; // No permitir acciones si está muerto
    }
    
    currentPlayer = ConnectionHandler.socket.id;
    const currentDirection = gameService?.currentPlayer?.direction || "left";
    
    // Prevenir el comportamiento predeterminado para evitar el desplazamiento de la página
    event.preventDefault();
    
    // Mapear teclas a acciones
    switch (event.key) {
        case "w":
        case "W":
        case "ArrowUp":
            // Mover hacia arriba
            console.log("Acción: Mover arriba");
            ConnectionHandler.socket.emit("message", {
                type: "MOVE",
                content: { id: currentPlayer, direction: "up" }
            });
            break;
            
        case "d":
        case "D":
        case "ArrowRight":
            // Mover hacia la derecha
            console.log("Acción: Mover derecha");
            ConnectionHandler.socket.emit("message", {
                type: "MOVE",
                content: { id: currentPlayer, direction: "right" }
            });
            break;
            
        case "s":
        case "S":
        case "ArrowDown":
            // Mover hacia abajo
            console.log("Acción: Mover abajo");
            ConnectionHandler.socket.emit("message", {
                type: "MOVE",
                content: { id: currentPlayer, direction: "down" }
            });
            break;
            
        case "a":
        case "A":
        case "ArrowLeft":
            // Mover hacia la izquierda
            console.log("Acción: Mover izquierda");
            ConnectionHandler.socket.emit("message", {
                type: "MOVE",
                content: { id: currentPlayer, direction: "left" }
            });
            break;
            
        case "r":
        case "R":
            // Rotar en sentido horario
            console.log("Acción: Rotar");
            const directions = ["up", "right", "down", "left"];
            const currentIndex = directions.indexOf(currentDirection);
            const nextIndex = (currentIndex + 1) % 4;
            const newDirection = directions[nextIndex];
            
            ConnectionHandler.socket.emit("message", {
                type: "ROTATE",
                content: { id: currentPlayer, newDirection }
            });
            break;
            
        case " ": // Tecla espacio
            // Disparar (solo si el jugador no está oculto)
            if (gameService?.currentPlayer?.visibility === false) {
                UIv1.showMessage("No puedes disparar mientras estás oculto");
                return;
            }
            
            console.log("Acción: Disparar");
            ConnectionHandler.socket.emit("message", {
                type: "SHOOT",
                content: { id: currentPlayer, direction: currentDirection }
            });
            break;
    }
});

    document.getElementById("moveBtn").addEventListener("click", () => {
        // Verificar si el juego ha comenzado
        if (!UIv1.gameStarted) {
            UIv1.showMessage("Esperando a que se conecten más jugadores...");
            return;
        }
        
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

        // Actualizar estado de los botones después de moverse
        UIv1.updateButtonStates();
    });
    
    document.getElementById("rotateBtn").addEventListener("click", () => {
        // Verificar si el juego ha comenzado
        if (!UIv1.gameStarted) {
            UIv1.showMessage("Esperando a que se conecten más jugadores...");
            return;
        }
        
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
        // Verificar si el juego ha comenzado
        if (!UIv1.gameStarted) {
            UIv1.showMessage("Esperando a que se conecten más jugadores...");
            return;
        }
        
        console.log("Acción: Disparar");
        currentPlayer = ConnectionHandler.socket.id;
        
        // Obtener la dirección actual del jugador para saber hacia dónde dispara
        const currentDirection = gameService?.currentPlayer?.direction || "left";
        
        ConnectionHandler.socket.emit("message", {
            type: "SHOOT",
            content: {
                id: currentPlayer,
                direction: currentDirection
            }
        });
    });
}

UIv1.updateButtonStates = () => {
    // Si el jugador está muerto, deshabilitar todos los botones
    if (gameService?.currentPlayer?.state === 4) { // PlayerStates.Dead = 4
        document.getElementById("moveBtn").disabled = true;
        document.getElementById("rotateBtn").disabled = true;
        document.getElementById("shootBtn").disabled = true;
        return;
    }
    
    // Si el jugador está en un arbusto (no es visible), deshabilitar el botón de disparar
    if (gameService?.currentPlayer && gameService.currentPlayer.visibility === false) {
        document.getElementById("shootBtn").disabled = true;
    } else {
        document.getElementById("shootBtn").disabled = false;
    }
    
    // Habilitar los botones de movimiento y rotación
    document.getElementById("moveBtn").disabled = false;
    document.getElementById("rotateBtn").disabled = false;
};

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
        tile.classList.remove("player", "current-player", "player-dead");
        tile.classList.remove("facing-up", "facing-right", "facing-down", "facing-left");
        tile.style.border = "";
        tile.style.boxShadow = "";
        tile.style.zIndex = "";
        tile.style.fontSize = "";
        tile.style.opacity = "1"; // Reset to fully visible
        tile.style.backgroundColor = "";
    });

    // Restore bushes from our persistent array
    persistentBushPositions.forEach(index => {
        if (index >= 0 && index < base.children.length) {
            const tile = base.children[index];
            tile.textContent = '🌳';
            tile.style.backgroundColor = 'green';
        }
    });

    // Draw players
    players.forEach(player => {
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

        // Si el jugador está muerto, hacerlo transparente
        if (player.state === 4) { // PlayerStates.Dead = 4
            tile.style.opacity = '0.3';
            tile.classList.add('player-dead');
        }

        // Highlight current player
        if (isCurrentPlayer) {
            tile.classList.add("current-player");
            if (!player.visibility) {
                tile.style.opacity = "0.7"; // Make semi-transparent if hidden
            }
        }
    });

    // Verificar si la partida ha comenzado (hay 4 jugadores)
    if (players.length === 4) {
        // Actualizar estado de los botones
        UIv1.updateButtonStates();
        // Si es la primera vez que detectamos 4 jugadores, mostrar mensaje
        if (!UIv1.gameStarted) {
            UIv1.showMessage("¡La partida ha comenzado!");
            UIv1.gameStarted = true;
        }
    } else {
        // Aún no hay suficientes jugadores
        document.getElementById("moveBtn").disabled = true;
        document.getElementById("rotateBtn").disabled = true;
        document.getElementById("shootBtn").disabled = true;
        UIv1.showMessage(`Esperando a que se conecten más jugadores (${players.length}/4)...`);
    }
};

let activeShotCells = [];

UIv1.drawShotTrajectory = (start, current, direction, final = false) => {
    const base = document.getElementById(UIv1.uiElements.board);
    // Obtener el tamaño del tablero dinámicamente
    const boardSize = Math.sqrt(base.children.length);
    
    console.log("Dibujando disparo en:", current.x, current.y, "con dirección:", direction);
    
    // Mostrar el efecto solo en la posición actual
    const index = current.x * boardSize + current.y;
    if (index >= 0 && index < base.children.length) {
        const tile = base.children[index];
        const originalBackground = tile.style.backgroundColor;
        const originalContent = tile.textContent;
        
        // Mostrar efecto
        tile.style.backgroundColor = "red";
        tile.textContent = "💥";

        // Restaurar después de un tiempo, con un tiempo diferente si es final
        const cleanupTime = final ? 400 : 200;
        
        // Restaurar después de un tiempo
        setTimeout(() => {
            tile.style.backgroundColor = originalBackground;
            tile.textContent = originalContent;
        }, 200);
    }
};

UIv1.showMessage = (message) => {
    // Crear un elemento para mostrar mensajes
    let messageDiv = document.getElementById("gameMessage");
    if (!messageDiv) {
        messageDiv = document.createElement("div");
        messageDiv.id = "gameMessage";
        messageDiv.style.position = "fixed";
        messageDiv.style.top = "10px";
        messageDiv.style.left = "50%";
        messageDiv.style.transform = "translateX(-50%)";
        messageDiv.style.background = "rgba(0,0,0,0.8)";
        messageDiv.style.color = "white";
        messageDiv.style.padding = "10px 20px";
        messageDiv.style.borderRadius = "5px";
        messageDiv.style.zIndex = "1000";
        document.body.appendChild(messageDiv);
    }
    
    messageDiv.textContent = message;
    messageDiv.style.display = "block";
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 3000);
};