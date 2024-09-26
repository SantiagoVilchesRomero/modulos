import { Player } from './player.js';
import { Deck } from './deck.js';
import { TYPES_DECKS } from "./config/types_decks.js";

class Blackjack {
    constructor() {
        let deck = new Deck(TYPES_DECKS.poker_deck)
        console.log(deck.generarBaraja());
    }
}

export { Blackjack };