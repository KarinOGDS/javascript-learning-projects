const form = document.getElementById('weatherForm');
const weatherInfo = document.getElementById('weatherInfo');
const searchBtn = document.getElementById('searchBtn');

const apiKey = 'YOUR_API_KEY';

form.addEventListener('submit', showWeatherDetails);

function showWeatherDetails(event) {

    event.preventDefault();

    const city =
        document.getElementById('city')
            .value
            .trim();

    if (city === '') {

        weatherInfo.innerHTML = `
            <p class="error">
                Please enter a city.
            </p>
        `;

        return;
    }

    searchBtn.disabled = true;

    weatherInfo.innerHTML = `
        <p class="loading">
            Loading weather data...
        </p>
    `;

    const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)

        .then(response => response.json())

        .then(data => {

            searchBtn.disabled = false;

            if (data.cod !== 200) {

                weatherInfo.innerHTML = `
                    <p class="error">
                        ${data.message}
                    </p>
                `;

                return;
            }

            const weatherMain =
                data.weather[0].main;

            const emoji =
                getWeatherEmoji(weatherMain);

            weatherInfo.innerHTML = `
                <div class="weather-card">

                    <div class="weather-icon">
                        ${emoji}
                    </div>

                    <h2>
                        Weather in ${data.name}
                    </h2>

                    <p>
                        🌡 Temperature:
                        ${data.main.temp} °C
                    </p>

                    <p>
                        ☁ Weather:
                        ${data.weather[0].description}
                    </p>

                    <p>
                        💧 Humidity:
                        ${data.main.humidity}%
                    </p>

                    <p>
                        🌬 Wind Speed:
                        ${data.wind.speed} m/s
                    </p>

                </div>
            `;
        })

        .catch(error => {

            searchBtn.disabled = false;

            console.error(error);

            weatherInfo.innerHTML = `
                <p class="error">
                    Unable to fetch weather data.
                </p>
            `;
        });
}

function getWeatherEmoji(weather) {

    switch (weather) {

        case 'Clear':
            return '☀️';

        case 'Clouds':
            return '☁️';

        case 'Rain':
            return '🌧️';

        case 'Drizzle':
            return '🌦️';

        case 'Thunderstorm':
            return '⛈️';

        case 'Snow':
            return '❄️';

        case 'Mist':
        case 'Fog':
        case 'Haze':
            return '🌫️';

        default:
            return '🌍';
    }
}