import { CarHandlerC } from "./CarHandlerC.js"

export const CarHandler = {
    carHandler:null, 
    getInstance: ( url) => {
        if (CarHandler.carHandler === null) {
            CarHandler.carHandler =  new CarHandlerC(url);
        }
        return CarHandler.carHandler;
    }
}