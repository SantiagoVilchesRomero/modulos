$(document).ready(() => {
    $(".menu-toggle").click(() => {
        $(".list-nav").toggleClass("list-nav-show");
        $("nav").toggleClass("show");
        $(".bar:nth-child(1)").toggleClass("rotate-45");
        $(".bar:nth-child(2)").toggleClass("hide");
        $(".bar:nth-child(3)").toggleClass("rotate45");
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() >= 800) {
            $('.menu').addClass('sticky');
            $('.fa-arrow-up').addClass('change');
        } else {
            $('.menu').removeClass('sticky');
            $('.fa-arrow-up').removeClass('change');
        }
    });

    $('.fa-arrow-up').hover(
        function() {
            // Cuando el mouse entra
            $(this).addClass('fa-bounce');
        },
        function() {
            // Cuando el mouse sale
            $(this).removeClass('fa-bounce');
        }
    );
});