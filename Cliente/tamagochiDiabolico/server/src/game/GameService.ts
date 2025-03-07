import { Socket } from "socket.io";
import { Directions, Player, PlayerStates } from "../player/entities/Player";
import { Room } from "../room/entities/Room";
import { RoomService } from "../room/RoomService";
import { Game, GameStates, Messages } from "./entities/Game";
import { BoardBuilder } from "./BoardBuilder";
import { ServerService } from "../server/ServerService"
import { RoomConfig } from "../room/entities/Room";

export class GameService {
    private games: Game[];
    private static instance: GameService;

    private constructor() {
        this.games = [];
    };

    static getInstance(): GameService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GameService();
        return this.instance;
    }

    public buildPlayer(socket: Socket): Player {
        return {
            id: socket,
            identifier: socket.id,
            x: 0,
            y: 0,
            state: PlayerStates.Idle,
            direction: Directions.Left,
            visibility: true
        }
    }

    // public getPlayersDataWithoutId(room: Room): Omit<Player, 'id'>[] {
    //     return room.players.map(({ id, ...rest }) => rest);
    // }

    public addPlayer(player: Player): boolean {
        const room: Room = RoomService.getInstance().addPlayer(player);
        const boardSize = new BoardBuilder().size;

        // Asignar una posición en una esquina según el índice del jugador
        const cornerPositions = [
            { x: 0, y: 0 },
            { x: 0, y: boardSize - 1 },
            { x: boardSize - 1, y: 0 },
            { x: boardSize - 1, y: boardSize - 1 }
        ];

        const index = room.players.findIndex(p => p.identifier === player.identifier);
        console.log(index + " soy el index");

        if (index < cornerPositions.length) {
            player.x = cornerPositions[index].x;
            player.y = cornerPositions[index].y;
        }

        // Serialización de jugadores (solo datos necesarios)
        const serializePlayers = (players: Player[]) => {
            return players.map(({ identifier, x, y, state, direction, visibility }) => ({
                identifier,
                x,
                y,
                state,
                direction,
                visibility
            }));
        };

        // Serialización del jugador individual
        const serializeSinglePlayer = (singlePlayer: Player) => {
            const { identifier, x, y, state, direction, visibility } = singlePlayer;
            return {
                identifier,
                x,
                y,
                state,
                direction,
                visibility
            };
        };

        // Crear el juego para el primer jugador o usar el existente
        if (!room.game) {
            const genRanHex = (size: number) =>
                [...Array(size)]
                    .map(() => Math.floor(Math.random() * 16).toString(16))
                    .join('');

            const game: Game = {
                id: "game" + genRanHex(128),
                state: GameStates.WAITING,
                room: room,
                board: new BoardBuilder().getBoard()
            };

            room.game = game;
            this.games.push(game);
        }

        // Enviar el tablero solo al jugador que se acaba de conectar
        player.id.emit("message", {
            type: Messages.BOARD,
            content: room.game!.board
        });

        // Enviar la información del jugador actual SOLO a ese jugador
        player.id.emit("message", {
            type: Messages.SINGLE_PLAYER,
            content: serializeSinglePlayer(player)
        });

        // Notificar a TODOS los jugadores sobre la lista actualizada de jugadores
        ServerService.getInstance().sendMessage(
            room.name,
            Messages.NEW_PLAYER,
            serializePlayers(room.players)
        );

        // Iniciar el juego cuando la sala esté completa
        if (room.players.length === RoomConfig.maxRoomPlayers) {
            room.game.state = GameStates.PLAYING;
            console.log("Juego iniciado");
            return true;
        }

        return false;
    }

    public handlePlayerMovement(data: { id: string, direction: Directions }): void {
        // 1. Encontrar la sala y el jugador
        const playerRoom = this.findPlayerRoom(data.id);
        if (!playerRoom) return;

        const player = playerRoom.players.find(p => p.identifier === data.id);
        if (!player) return;

        // Verificar si el jugador está muerto
        if (player.state === PlayerStates.Dead) {
            return; // No permitir movimiento si está muerto
        }
        // 2. Actualizar la dirección del jugador
        player.direction = data.direction;

        // 3. Calcular la nueva posición basada en la dirección
        const newPosition = this.calculateNewPosition(player);

        // 4. Comprobar si el movimiento es válido
        if (this.isValidMove(playerRoom.game!, newPosition.x, newPosition.y)) {
            // 5. Actualizar la posición
            player.x = newPosition.x;
            player.y = newPosition.y;

            // Comprobar si la nueva posición contiene un arbusto
            const isBush = playerRoom.game!.board.elements.some(
                element => Number(element.x) === newPosition.x && Number(element.y) === newPosition.y
            );

            // Actualizar visibilidad según si está en un arbusto o no
            player.visibility = !isBush;

            // 6. Notificar a todos los jugadores de la sala sobre el movimiento
            const serializedPlayers = this.serializePlayers(playerRoom.players);
            ServerService.getInstance().sendMessage(
                playerRoom.name,
                Messages.NEW_PLAYER,
                serializedPlayers
            );
        }
    }

    private findPlayerRoom(playerId: string): Room | undefined {
        // Recorre todos los juegos para encontrar la sala del jugador
        for (const game of this.games) {
            const player = game.room.players.find(p => p.identifier === playerId);
            if (player) return game.room;
        }
        return undefined;
    }

    private calculateNewPosition(player: Player): { x: number, y: number } {
        const x = Number(player.x);
        const y = Number(player.y);

        switch (player.direction) {
            case Directions.Up:
                return { x: x - 1, y };
            case Directions.Down:
                return { x: x + 1, y };
            case Directions.Left:
                return { x, y: y - 1 };
            case Directions.Right:
                return { x, y: y + 1 };
            default:
                return { x, y };
        }
    }

    private isValidMove(game: Game, x: number, y: number): boolean {
        // 1. Comprobar límites del tablero
        if (x < 0 || y < 0 || x >= game.board.size || y >= game.board.size) {
            return false;
        }

        // 2. Comprobar si hay algún jugador VIVO en esta posición
        const isOccupiedByLivingPlayer = game.room.players.some(
            p => Number(p.x) === x &&
                Number(p.y) === y &&
                p.state !== PlayerStates.Dead // Solo nos importan los jugadores vivos
        );

        if (isOccupiedByLivingPlayer) return false;

        return true;
    }

    private serializePlayers(players: Player[]) {
        return players.map(({ identifier, x, y, state, direction, visibility }) => ({
            identifier,
            x,
            y,
            state,
            direction,
            visibility
        }));
    }

    public handlePlayerRotation(data: { id: string, newDirection: Directions }): void {
        // 1. Encontrar la sala y el jugador
        const playerRoom = this.findPlayerRoom(data.id);
        if (!playerRoom) return;

        const player = playerRoom.players.find(p => p.identifier === data.id);
        if (!player) return;

        // Verificar si el jugador está muerto
        if (player.state === PlayerStates.Dead) {
            return; // No permitir rotación si está muerto
        }

        // 2. Actualizar SOLO la dirección del jugador, NO la visibilidad
        player.direction = data.newDirection;

        // 3. Notificar a todos los jugadores de la sala sobre la rotación
        const serializedPlayers = this.serializePlayers(playerRoom.players);
        ServerService.getInstance().sendMessage(
            playerRoom.name,
            Messages.NEW_PLAYER,
            serializedPlayers
        );
    }

    public handlePlayerShoot(data: { id: string, direction: Directions }): void {
        // 1. Encontrar la sala y el jugador que dispara
        const playerRoom = this.findPlayerRoom(data.id);
        if (!playerRoom) return;

        const shooter = playerRoom.players.find(p => p.identifier === data.id);
        if (!shooter) return;

        // Verificar si el jugador está muerto
        if (shooter.state === PlayerStates.Dead) {
            return; // No permitir disparar si está muerto
        }


        // Guardamos la posición inicial del disparo para que no cambie si el jugador se mueve
        const shotOrigin = {
            x: Number(shooter.x),
            y: Number(shooter.y)
        };

        // 2. Iniciar el proceso de disparo gradual con coordenadas fijas
        this.processShotStep(playerRoom, shooter, data.direction, 0, shotOrigin);
    }

    private processShotStep(
        room: Room,
        shooter: Player,
        direction: Directions,
        step: number,
        shotOrigin: { x: number, y: number }
    ): void {
        const boardSize = room.game!.board.size;

        // Iniciamos desde el origen fijo del disparo, no de la posición actual del jugador
        let x = shotOrigin.x;
        let y = shotOrigin.y;

        // Avanzamos el disparo según los pasos
        for (let i = 0; i <= step; i++) {
            if (i > 0) { // No modificar la posición inicial
                switch (direction) {
                    case Directions.Up: x--; break;
                    case Directions.Down: x++; break;
                    case Directions.Left: y--; break;
                    case Directions.Right: y++; break;
                }
            }
        }

        // Verificar si el disparo está fuera de los límites
        if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) {
            // El disparo ha salido del tablero - AÑADIMOS UN MENSAJE FINAL PARA LIMPIAR LA VISUALIZACIÓN
            ServerService.getInstance().sendMessage(
                room.name,
                Messages.SHOT_TRAJECTORY,
                {
                    start: { x: shotOrigin.x, y: shotOrigin.y },
                    current: {
                        // Enviamos la última posición válida antes del límite
                        x: Math.max(0, Math.min(x, boardSize - 1)),
                        y: Math.max(0, Math.min(y, boardSize - 1))
                    },
                    direction,
                    final: true // Indicamos que es la última posición
                }
            );
            return;
        }

        // Verificar si hay un arbusto
        const isBush = room.game!.board.elements.some(
            element => Number(element.x) === x && Number(element.y) === y
        );

        if (isBush) {
            // El disparo impacta el arbusto
            ServerService.getInstance().sendMessage(
                room.name,
                Messages.SHOT_TRAJECTORY,
                {
                    start: { x: shotOrigin.x, y: shotOrigin.y },
                    current: { x, y },
                    direction,
                    final: true
                }
            );
            return;
        }

        // Verificar si hay un jugador visible en esta posición
        const hitPlayer = room.players.find(
            p => Number(p.x) === x &&
                Number(p.y) === y &&
                p.identifier !== shooter.identifier &&
                p.visibility === true
        );

        if (hitPlayer) {
            // Ha impactado a un jugador
            hitPlayer.state = PlayerStates.Dead;
            hitPlayer.visibility = false;

            ServerService.getInstance().sendMessage(
                room.name,
                Messages.SHOT_IMPACT,
                {
                    shooterId: shooter.identifier,
                    targetId: hitPlayer.identifier,
                    position: { x, y }
                }
            );

            const serializedPlayers = this.serializePlayers(room.players);
            ServerService.getInstance().sendMessage(
                room.name,
                Messages.NEW_PLAYER,
                serializedPlayers
            );

            // Comprobar si hay un ganador (solo queda un jugador vivo)
            const alivePlayers = room.players.filter(p => p.state !== PlayerStates.Dead);
            if (alivePlayers.length === 1) {
                // El último jugador vivo es el ganador
                const winner = alivePlayers[0];
                ServerService.getInstance().sendMessage(
                    room.name,
                    Messages.GAME_OVER,
                    {
                        winnerId: winner.identifier,
                        winnerName: `Jugador ${room.players.findIndex(p => p.identifier === winner.identifier) + 1}`
                    }
                );
            }

            return;
        }

        // Enviar actualización de la posición del disparo
        ServerService.getInstance().sendMessage(
            room.name,
            Messages.SHOT_TRAJECTORY,
            {
                start: { x: shotOrigin.x, y: shotOrigin.y },
                current: { x, y },
                direction,
                final: false
            }
        );

        // Seguir con el siguiente paso después de un retraso
        setTimeout(() => {
            this.processShotStep(room, shooter, direction, step + 1, shotOrigin);
        }, 300); // Ajusta este valor para controlar la velocidad del disparo
    }

}
