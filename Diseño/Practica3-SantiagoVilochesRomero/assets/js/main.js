$(document).ready(function () {  /* Cuando esté el documento HTML totalmente cargado */
    $(".hamburger-check").click ( function () { /* Cuando haga click en el elemento con clase .menu-toggle */
        console.log("Hamburger clicked!");
        $(".list-nav").toggleClass("view");  /* Añado la clase .show a .nav-list */
        $(".hamburger svg").toggleClass("invert");
    });
});