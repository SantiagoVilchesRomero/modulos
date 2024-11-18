const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 100) {
            $('.banner').addClass('sticky');
        } else {
            $('.banner').removeClass('sticky');
        }
    })
});