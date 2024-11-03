$(document).ready(function () {  /* Cuando esté el documento HTML totalmente cargado */
    $(".hamburger-check").click ( function () { /* Cuando haga click en el elemento con clase .menu-toggle */
        console.log("Hamburger clicked!");
        $(".list-nav").toggleClass("view");  /* Añado la clase .show a .nav-list */
        $(".hamburger svg").toggleClass("invert");
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() >= 100) {
            $('.menu').addClass('sticky');
        } else {
            $('.menu').removeClass('sticky');
        }
    })

    $(".cave-daving-button").click ( function () { 
        $(".cave-diving").toggleClass("show");  
        $(".athletes-motocross").removeClass("show");
        $(".athletes-hang-gliding").removeClass("show");

        $('html, body').animate({
            scrollTop: $(".cave-diving").offset().top
        }, 50);
    });

    $(".motocross-button").click ( function () { 
        $(".athletes-motocross").toggleClass("show");  
        $(".cave-diving").removeClass("show");
        $(".athletes-hang-gliding").removeClass("show");

        $('html, body').animate({
            scrollTop: $(".athletes-motocross").offset().top
        }, 50);
    });

    $(".hang-gliding-button").click ( function () { 
        $(".athletes-hang-gliding").toggleClass("show");  
        $(".cave-diving-button").removeClass("show");
        $(".athletes-motocross").removeClass("show");

        $('html, body').animate({
            scrollTop: $(".athletes-hang-gliding").offset().top
        }, 50);
    });

});