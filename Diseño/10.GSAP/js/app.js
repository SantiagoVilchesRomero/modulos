// REGISTRAR EL PLUGIN
gsap.registerPlugin('ScrollTrigger');

// LOGO
gsap.from( '.logo-img', {
    opacity: 0,
    x: -100,
})

// BRANDING
gsap.from( '.logo div', {
    opacity: 0,
    x: 200,
})

// NAV LINE
const menu_items = document.querySelector('.menu-items');

gsap.from( menu_items.children, {
    opacity: 0,
    x: 0,
    y: -100,
    duration: .25,
    delay: .5,
    stagger: {
        amount: 1,
    }
})

// TITLE 
gsap.utils.toArray('.title').forEach( title => {
    gsap.fromTo( title, {
        opacity: 0,
        x: -400
    }, {
        opacity: 1,
        x: 0,
        scrollTrigger: title,
    })
})

// STAR

gsap.utils.toArray('.star').forEach( star => {
    gsap.fromTo( star, {
        opacity: 0,
        rotation: 850,
        duration: .5,
        y: 200,
    }, {
        opacity: 1,
        rotation: 0,
        y:0,
        scrollTrigger: star,
    })
})