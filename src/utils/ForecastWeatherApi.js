import { location } from "./constants";

class ForecastWeatherApi {
  constructor() {
    // Initialize the API configuration parameters.
    this._latitude = location.latitude;
    this._longitude = location.longitude;
    this._APIkey = "0f6644e4cecfb4b8560776a0d89aaa59";
  }

  // Processes the responses
  _processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  // Fetches weather information
  getForecastWeather = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this._latitude}&lon=${this._longitude}&units=imperial&appid=${this._APIkey}`
    ).then(this._processServerResponse);
  };

  // Method to determine the weather type based on weather id
  getWeatherType = (weather) => {
    const weatherID = weather.weather[0].id;
    let weatherType = "sunny";

    // For more information about weather IDs
    // https://openweathermap.org/weather-conditions
    if (
      (weatherID <= 232 && weatherID >= 200) ||
      weatherID === 771 ||
      weatherID === 781
    ) {
      weatherType = "storm";
    } else if (weatherID <= 531 && weatherID >= 300) {
      weatherType = "rain";
    } else if (weatherID <= 622 && weatherID >= 600) {
      weatherType = "snow";
    } else if (weatherID <= 804 && weatherID >= 801) {
      weatherType = "cloudy";
    } else if (weatherID <= 762 && weatherID >= 701) {
      weatherType = "fog";
    }

    return weatherType;
  };

  // Method to determine if it's currently daytime based on sunset time
  getTime = (weather) => {
    const sunset = weather.sys.sunset;
    const date = Date.now() / 1000;

    if (date - sunset < 0) {
      return true; // It's daytime.
    }

    return false; // It's nighttime.
  };
}

export default ForecastWeatherApi;
