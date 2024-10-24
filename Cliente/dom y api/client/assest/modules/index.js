import {Ui} from "./ui.js";
fetch("http://localhost:3000")
    .then(response => response.json())
    .then((data) => new Ui("prototipe", data));


