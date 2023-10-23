//
import { location } from "./constants";

class ForecastWeatherApi {
  constructor() {
    this._latitude = location.latitude;
    this._longitude = location.longitude;
    this._APIkey = "0f6644e4cecfb4b8560776a0d89aaa59";
  }

  _processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getForecastWeather = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this._latitude}&lon=${this._longitude}&units=imperial&appid=${this._APIkey}`
    ).then(this._processServerResponse);
  };

  getWeatherType = (weather) => {
    const weatherID = weather.weather[0].id;
    let weatherType = "sunny";
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

  getTime = (weather) => {
    const sunset = weather.sys.sunset;
    const date = Date.now() / 1000;
    if (date - sunset < 0) {
      return true;
    }
    return false;
  };
}

export default ForecastWeatherApi;
