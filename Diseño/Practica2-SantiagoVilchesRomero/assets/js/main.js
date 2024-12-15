$(document).ready(() => {
    $(".menu-toggle").click(() => {
        $(".list-nav").toggleClass("list-nav-show");
        $("nav").toggleClass("show");
        $(".bar:nth-child(1)").toggleClass("rotate-45");
        $(".bar:nth-child(2)").toggleClass("hide");
        $(".bar:nth-child(3)").toggleClass("rotate45");
    });
});

// Gallery code
const all = document.getElementById('all');
const landscape = document.getElementById('landscape');
const blackwhite = document.getElementById('blackwhite');
const portrait = document.getElementById('portrait');
const images = Array.prototype.slice.call(document.getElementsByClassName('galleryImage'));

const TIME = 250;

all.onclick = () => {
    images.forEach(item => {
        item.classList.add('hide');
    });
    setTimeout(() => {
        images.forEach(item => {
            item.style.display = "block";
            item.classList.remove('hide');
        });
    }, TIME)
    toggleActive(all.id);
}

landscape.onclick = () => {
    images.forEach(item => {
        item.classList.add('hide');
    });
    setTimeout(() => {
        images.filter(item => item.classList[1] != 'landscape').forEach(item => item.style.display = "none");
        images.filter(item => item.classList[1] === 'landscape').forEach(item => {
            item.style.display = "block";
            item.classList.remove('hide');
        });
    }, TIME)
    toggleActive(landscape.id);
}

portrait.onclick = () => {
    images.forEach(item => {
        item.classList.add('hide');
    });
    setTimeout(() => {
        images.filter(item => item.classList[1] != 'portrait').forEach(item => item.style.display = "none");
        images.filter(item => item.classList[1] === 'portrait').forEach(item => {
            item.style.display = "block";
            item.classList.remove('hide');
        });
    }, TIME)
    toggleActive(portrait.id);
}

blackwhite.onclick = () => {
    images.forEach(item => {
        item.classList.add('hide');
    });
    setTimeout(() => {
        images.filter(item => item.classList[1] != 'blackwhite').forEach(item => item.style.display = "none");
        images.filter(item => item.classList[1] === 'blackwhite').forEach(item => {
            item.style.display = "block";
            item.classList.remove('hide');
        });
    }, TIME)
    toggleActive(blackwhite.id);
}

function toggleActive(btn) {
    [portrait, blackwhite, landscape, all].filter(item => item.id != btn).forEach(item => item.classList.remove('bActive'));
    [portrait, blackwhite, landscape, all].find(item => item.id === btn).classList.add('bActive');
}