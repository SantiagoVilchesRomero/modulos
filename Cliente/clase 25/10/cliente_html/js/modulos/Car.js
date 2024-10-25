export class Car {
    constructor(marca, matricula, color, averia) {
        this._marca = marca;
        this._matricula = matricula;
        this._color = color;
        this._averia = averia;
        console.log("Creo el coche "+matricula);
    }

    get marca() {
        return this._marca;
    }

    set marca(marca) {
        this._marca = marca;
    }

    get matricula() {
        return this._matricula;
    }

    set matricula(matricula) {
        this._matricula = matricula;
    }
}