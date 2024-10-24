import { Handler } from "./modules/Handler.js";

const handler = new Handler("http://localhost:3000");

let a = handler.getAll( (datos) => {
    console.log(datos);
} )

