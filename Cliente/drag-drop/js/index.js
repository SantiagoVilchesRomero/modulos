import { uiDrag } from "./uiDrag.js";
import { deckBuilder } from "./deckBuilder.js";
import { playerDeck } from "./playerDeck.js";


deckBuilder.builder();
playerDeck.deckShuffle();
uiDrag.init(".drop-zone", ".card");