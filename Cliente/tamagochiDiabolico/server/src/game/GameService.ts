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
            direction: Directions.Up,
            visibility: true
        }
    }

    // public getPlayersDataWithoutId(room: Room): Omit<Player, 'id'>[] {
    //     return room.players.map(({ id, ...rest }) => rest);
    // }
    
    public addPlayer(player: Player): boolean {
        const room: Room = RoomService.getInstance().addPlayer(player);
        const boardSize = new BoardBuilder().size; //BoardBuilder.size no me funciona, preguntar
        const players = room.players;
        console.log(players);
        const cornerPositions = [
            { x: 0, y: 0 },
            { x: 0, y: boardSize - 1 },
            { x: boardSize - 1, y: 0 },
            { x: boardSize - 1, y: boardSize - 1 }
        ];
        const index = players.findIndex(p => p.identifier === player.identifier);
        console.log(index + " soy el index");
        if (index < cornerPositions.length) {
            player.x = cornerPositions[index].x;
            player.y = cornerPositions[index].y;
        }
    
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
    
        if (!room.game) {
            const genRanHex = (size: Number) =>
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
            
            player.id.emit("message", {
                type: Messages.BOARD,
                content: room.game.board
            });
        } else {
            
            player.id.emit("message", {
                type: Messages.BOARD,
                content: room.game.board
            });
        }
    
        
        ServerService.getInstance().sendMessage(
            room.name,
            Messages.NEW_PLAYER,
            serializePlayers(players)
        );
    

        if (room.players.length === RoomConfig.maxRoomPlayers) { 
            room.game.state = GameStates.PLAYING;
            console.log("Juego iniciado");
            // if (ServerService.getInstance().isActive()) {
            //     ServerService.getInstance().sendMessage(
            //         room.name,
            //         Messages.BOARD,
            //         room.game.board
            //     );
            // } // Creo que aqui al meter el 4 jugador se manda un tablero y se sobre escribe el tablero
            return true;
        }
        return false;
    }

}
