async function getWeatherData() {
    const cityInput = document.getElementById('cityName');
    const cityName = cityInput.value.trim();

    if (cityName !== '') {
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=7QKM2EUH7YYEX5XKJUKS97Y4Q&contentType=json`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Actualizar las tarjetas meteorológicas con datos reales
            data.days.forEach((dayData, index) => {
                updateWeatherCard(dayData, index);
            });
        } catch (error) {
            console.error('Error al obtener datos del clima:', error);
        }
    } else {
        alert('Por favor, ingrese el nombre de la ciudad.');
    }
}

// Resto de tu código JavaScript permanece igual...


// Función para actualizar una tarjeta meteorológica con datos reales
function updateWeatherCard(data, cardIndex) {
  const card = document.getElementsByClassName('card')[cardIndex];
  const cardImg = card.querySelector('.card-img-top');
  const cardTitle = card.querySelector('.card-title');
  const cardText = card.querySelector('.card-text');

  // Actualizar la imagen de fondo según la probabilidad de lluvia
  if (data.conditions === "Snow,Overcast") {
    cardImg.src = "/img/snowiday.jpg";
} else if (data.conditions=== "partiallycloudy") {
    cardImg.src = "/img/cloudy.jpg";
} else if (data.cloudcover > 80) {
    cardImg.src = "/img/Raining.jpg";
} else if (data.cloudcover > 70) {
    cardImg.src = "/img/Raining.jpg";
} else if (data.cloudcover > 50) {
    cardImg.src = "/img/cloudy.jpg";
} else if (data.cloudcover > 30) {
    cardImg.src = "/img/clearday.jpg";
} else {
    cardImg.src = "/img/sunday.jpg";
}

  cardTitle.textContent = ` ${data.datetime}`;
  cardText.innerHTML = `
      Temperatura Maxima: ${data.tempmax}°C  <br>
      Temperatura Minima: ${data.tempmin}°C <br>
      Humedad: ${data.humidity}% <br>
      Visibilidad: ${data.visibility} km <br>
      Presión Atmosférica: ${data.pressure} hPa <br>
      Predicción: ${data.conditions}
  `;
}
