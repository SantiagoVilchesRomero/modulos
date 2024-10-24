import { Ui } from "./modules/ui.js";
fetch("http://localhost:3000")
    .then(response => response.json())
    .then((data) => new Ui("prototipe", data));


