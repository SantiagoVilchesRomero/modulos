import { Player } from './player.js';

class Game {
    constructor() {
        this.rounds = 5;
        this.player = new Player();
    }
}

export { Game };