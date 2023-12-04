const apiKey = 'QNxC7b0ZE6kvBeOuS9YgLVZYd9CzZWRav3Jl6J0lmin01dOqvooN4M7K';

function getWeatherAndSearchImages() {
  const cityInput = document.getElementById('cityName');
  const city = cityInput.value.trim();

  if (city !== '') {
    const imagesContainer = document.getElementById('images-container');
    imagesContainer.innerHTML = '';

    const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(city)}&per_page=4`;

    fetch(apiUrl, {
      headers: {
        'Authorization': apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.photos && data.photos.length > 0) {
          for (let i = 0; i < 4; i++) {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('container-cards');

            const cardCol = document.createElement('div');
            cardCol.classList.add('col');

            const card = document.createElement('div');
            card.classList.add('card');

            const imgElement = document.createElement('img');
            imgElement.src = data.photos[i].src.medium;
            imgElement.classList.add('card-img-top');
            imgElement.alt = 'City Image';

            // Agregar la tarjeta al contenedor de imágenes
            card.appendChild(imgElement);
            cardCol.appendChild(card);
            cardContainer.appendChild(cardCol);
            imagesContainer.appendChild(cardContainer);
          }
        } else {
          console.error('No se encontraron imágenes para la ciudad especificada.');
        }
      })
      .catch(error => {
        console.error('Error al buscar imágenes:', error);
      });
  } else {
    alert('Por favor, ingrese el nombre de la ciudad.');
  }
}
