export const GameService = {
    States: {
        WAITING: 0,
        PLAYING: 1,
        FINISHED: 2,
    },
    state: GameService.States.WAITING,
    players: [],
    board: null,
    action: (message) => {
        //Proximamente (en clase hicimos un switch pero da asco)
    }
}