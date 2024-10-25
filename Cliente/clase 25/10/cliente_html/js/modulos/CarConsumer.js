import { Car } from "./Car.js";

export class CarConsumer {
    static consum(datos){
        let cars=[];
        datos.forEach(element => {
            let car = new Car(element.marca,element.matricula,element.color,element.averia);
            cars.push(car);
        });
        return cars
    }
}