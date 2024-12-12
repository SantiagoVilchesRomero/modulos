export const deckBuilder = {
    builder: () => {
        const suits = ["espada", "oro", "basto", "copa"];

        // Selecciona el contenedor
        const cardsContainer = document.getElementById('cards-container');
        let cardNum = 0;
        // Genera 40 cartas
        for (let i = 1; i <= 40; i++) {
            const card = document.createElement('div'); // Crea un div
            card.classList.add('card'); // Añade la clase "card"
            card.id = `card-${i}`; // Asigna un ID incremental


            const suitIndex = Math.floor((i - 1) / 10);
            card.setAttribute('data-suit', suits[suitIndex]);
            card.setAttribute('data-value', i);

            // Agrega texto para identificar la carta
            cardNum++;
            if (cardNum > 10) {
                cardNum = 1;
            }
            card.setAttribute('data-value', cardNum);
            card.textContent = `${cardNum}`;
            cardsContainer.appendChild(card);
        }
    }
}