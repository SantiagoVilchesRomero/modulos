class Ui {
    constructor(fatherName,messages){
        let div = document.getElementById(fatherName);
        messages.forEach(element => {
            let clone = div.cloneNode(true);
            clone.firstElementChild.firstChild.nodeValue = element.name;
            clone.style.display = 'block';
            div.insertAdjacentElement('afterend', clone);
        });
        
        
    }
}
export {Ui}