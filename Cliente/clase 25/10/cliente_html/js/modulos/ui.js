export const UI = {
    drawCars: (cars, elementDiv) => {
        cars.forEach(element => {
            elementDiv.innerHTML += `<p>${element.matricula}</p>`
        });
    }
}