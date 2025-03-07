import { Room } from "../../room/entities/Room";
import { Board } from "./Board";

export enum GameStates {
    WAITING, PLAYING
}

export enum Messages {
    BOARD = "BOARD",
    NEW_PLAYER = "NEW_PLAYER",
    SINGLE_PLAYER = "SINGLE_PLAYER",
    SHOT_IMPACT = "SHOT_IMPACT",
    SHOT_TRAJECTORY = "SHOT_TRAJECTORY" ,
    GAME_OVER = "GAME_OVER"
}

export interface Game {
    id : String,
    state: GameStates,
    room: Room,
    board: Board
}