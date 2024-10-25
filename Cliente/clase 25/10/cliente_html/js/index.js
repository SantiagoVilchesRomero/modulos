import {CarHandler} from './modulos/CarHandler.js';
import { CarConsumer } from './modulos/CarConsumer.js';
import { UI } from './modulos/ui.js';

let cars = null;
CarHandler.getInstance('http://localhost:3000').getAllCars((datos)=> {
  cars = CarConsumer.consum(datos.lista);
  UI.drawCars(cars, document.getElementById('coches'));
});
