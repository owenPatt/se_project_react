//
import { location } from "./constants";

class ForecastWeatherApi {
  constructor() {
    this._latitude = location.latitude;
    this._longitude = location.longitude;
    this._APIkey = "0f6644e4cecfb4b8560776a0d89aaa59";
  }

  getForecastWeather = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this._latitude}&lon=${this._longitude}&units=imperial&appid=${this._APIkey}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.error(e);
      });
  };
}

export default ForecastWeatherApi;
