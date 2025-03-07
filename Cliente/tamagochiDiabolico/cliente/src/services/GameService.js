import { Board } from "../entities/Board.js";
import { Queue } from "../Queue.js";
export class GameService {
    #states = {
        WAITING: 0,
        PLAYING: 1,
        ENDED: 2
    };
    #ui = null;
    #players = [];
    #board = null;
    #queue = null;
    #state = null;
    #parallel = null;
    currentPlayer = null;

    #actionsList = {
        "NEW_PLAYER": this.do_newPlayer.bind(this),
        "BOARD": this.do_newBoard.bind(this),
        "SINGLE_PLAYER": this.do_singlePlayer.bind(this),
        "SHOT_TRAJECTORY": this.do_shotTrajectory.bind(this),
        "SHOT_IMPACT": this.do_shotImpact.bind(this),
        "GAME_OVER": this.do_gameOver.bind(this)
    };

    constructor(ui) {
        console.log(this);
        this.#state = this.#states.WAITING;
        this.#board = new Board();
        this.#queue = new Queue();
        this.#parallel = null;
        this.checkScheduler();
        this.#ui = ui;
    }

    setPlayer(player) {
        this.currentPlayer = player;
    }

    checkScheduler() {
        if (!this.#queue.isEmpty()) {
            if (this.#parallel == null) {
                this.#parallel = setInterval(
                    async () => {
                        const action = this.#queue.getMessage();
                        if (action != undefined) {
                            await this.#actionsList[action.type](action.content);
                        } else {
                            this.stopScheduler();
                        }
                    }
                );
            }
        }
    }

    stopScheduler() {
        clearInterval(this.#parallel);
        this.#parallel = null;
    }

    do(data) {
        this.#queue.addMessage(data);
        this.checkScheduler();
    };

    async do_newPlayer(payload) {
        this.#players = payload;
        // Actualizar el jugador actual con los datos recibidos
        if (this.currentPlayer) {
            const updatedCurrentPlayer = payload.find(p => p.identifier === this.currentPlayer.identifier);
            if (updatedCurrentPlayer) {
                this.currentPlayer = updatedCurrentPlayer;
            }
        }
        const boardSize = this.#board.map.length;
        this.#ui.drawPlayers(this.#players, boardSize);

        // Actualizar el estado de los botones cuando hay cambios en los jugadores
        if (typeof this.#ui.updateButtonStates === 'function') {
            this.#ui.updateButtonStates();
        }
    };

    async do_newBoard(payload) {
        this.#board.build(payload);
        this.#ui.drawBoard(this.#board.map);
    }

    async do_singlePlayer(payload) {
        console.log("Single Player");
        console.log(payload);
        this.currentPlayer = payload;
    }

    // Implementar métodos para manejar la trayectoria y el impacto
    async do_shotTrajectory(payload) {
        console.log("Shot trajectory received:", payload);
        this.#ui.drawShotTrajectory(payload.start, payload.current, payload.direction, payload.final);
    }

    async do_shotImpact(payload) {
        console.log("Shot impact received:", payload);
        const { targetId } = payload;
        // Si el jugador impactado soy yo, mostrar mensaje
        if (this.currentPlayer && targetId === this.currentPlayer.identifier) {
            this.#ui.showMessage("¡Has sido eliminado!");
        }
    }

    // Implementa el nuevo método:
    async do_gameOver(payload) {
        console.log("Game over received:", payload);
        const { winnerId, winnerName } = payload;

        // Si yo soy el ganador
        if (this.currentPlayer && winnerId === this.currentPlayer.identifier) {
            this.#ui.showMessage("¡HAS GANADO LA PARTIDA! 🏆");
        } else {
            // Si otro jugador ganó
            this.#ui.showMessage(`${winnerName} ha ganado la partida.`);
        }
    }

}