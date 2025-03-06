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
    
        // 2. Ya no rechazamos el movimiento si hay un arbusto
        // Sólo comprobamos si hay otro jugador (incluso invisible)
        const isOccupiedByPlayer = game.room.players.some(
            p => Number(p.x) === x && Number(p.y) === y
        );
        if (isOccupiedByPlayer) return false;
    
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

}
