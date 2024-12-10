(function () {

    let tabla = document.getElementById('tablaPokemons');

    if(tabla) {
        tabla.addEventListener('click', clickTable);
    }

    function clickTable(event) {
        let target = event.target;
        if(target.tagName === 'A' && target.getAttribute('class') === 'borrar') {
            confirmDelete(event);
        }
    }

    function confirmDelete(event) {
        if(!confirm('¿Estás seguro de que deseas eliminar este Pokémon?')) {
            event.preventDefault();
        }
    }

})();