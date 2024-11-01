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

    $(".cave-daving").click ( function () { 
        console.log("clicked!");
        $(".athletes-cave-diving").toggleClass("show");  
        $(".athletes-motocross").removeClass("show");
        $(".athletes-hang-gliding").removeClass("show");
    });

    $(".motocross").click ( function () { 
        $(".athletes-motocross").toggleClass("show");  
        $(".athletes-cave-diving").removeClass("show");
        $(".athletes-hang-gliding").removeClass("show");
    });

    $(".hang-gliding").click ( function () { 
        console.log("clicked!");
        $(".athletes-hang-gliding").toggleClass("show");  
        $(".athletes-cave-diving").removeClass("show");
        $(".athletes-motocross").removeClass("show");
    });
});