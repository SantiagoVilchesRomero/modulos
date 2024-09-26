class Deck {
    constructor(type) {
        this._valor = type.valores;
        this._palos = type.palos;
        this._deck = [];
    }

    generarBaraja() {
        this._palos.forEach((element) => {
            this._valor.forEach((value) => { this._deck.push(value + ' de ' + element) })
        });
        return this._deck;
    }
}

export { Deck };