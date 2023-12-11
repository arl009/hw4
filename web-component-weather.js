class WeatherWidget extends HTMLElement {
    constructor() {
        super();
        this.fetchForecastEndpoint(32.7156, -117.1617);
    }

    async fetchForecastEndpoint(latitude, longitude) {
        try {
            const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
            const data = await response.json();

            // Get the forecast URL from the response
            const forecastUrl = data.properties.forecast;
            this.fetchForecastData(forecastUrl);
        } catch (error) {
            this.querySelector('#weather-info').textContent = 'Error fetching forecast endpoint';
        }
    }

    async fetchForecastData(url) {
        try {
            const response = await fetch(url);
            const forecastData = await response.json();

            // Update the widget with forecast data
            // For example, display the first period's forecast
            const forcastNow = forecastData.properties.periods[0];
            
            const emoji = this.getWeatherEmoji(forcastNow.shortForecast);
            console.log(forcastNow);
            this.querySelector('#weather-info').textContent = 'The weather for ' + forcastNow.name.toLowerCase() + ': ' + emoji + " " + forcastNow.shortForecast + ' ' + forcastNow.temperature + '\u00B0' + forcastNow.temperatureUnit;
            this.querySelector('#weather-humidity').textContent = 'The humidity is: ' + forcastNow.relativeHumidity.value + '%';
            this.querySelector('#weather-speed').textContent = 'The wind speed is: ' + forcastNow.windSpeed;
        } catch (error) {
            this.querySelector('#weather-info').textContent = 'Error fetching forecast data';
        }
    }

    getWeatherEmoji(shortForecast) {
        if (shortForecast.includes("Sunny")) {
            return "☀️";
        } else if (shortForecast.includes("Cloudy")) {
            return "☁️";
        } else if (shortForecast.includes("Rain")) {
            return "🌧️";
        } else if (shortForecast.includes("Snow")) {
            return "❄️";
        } else if (shortForecast.includes("Thunder")) {
            return "⛈️";
        } else {
            return "🌆";
        }
    }
}

window.customElements.define('weather-widget', WeatherWidget);