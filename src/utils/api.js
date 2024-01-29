import { location } from "./constants";

export class ProfileApi {
  constructor(token) {
    this._token = token;
    this._baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.wtwr.haoqiw.com"
        : "http://localhost:3001";
    this._headers = {
      "content-type": "application/json",
    };
    this._secHeaders = {
      "content-type": "application/json",
      Authorization: `Bearer ${this._token}`,
    };
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  _request = (url, method, body) => {
    return fetch(url, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  };

  _secureRequest = (url, method, body) => {
    const token = localStorage.getItem("jwt");
    this._secHeaders.Authorization = `Bearer ${token}`;
    return fetch(url, {
      method: method,
      headers: this._secHeaders,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  };

  getItems = () => {
    //Gets the initial cards
    return this._request(`${this._baseUrl}/items`, "GET");
  };

  postItem = ({ name, imageUrl, weather }) => {
    return this._secureRequest(`${this._baseUrl}/items`, "POST", {
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    });
  };

  deleteItem = ({ _id }) => {
    return this._secureRequest(`${this._baseUrl}/items/${_id}`, "DELETE");
  };

  addCardLike = (_id) => {
    return this._secureRequest(`${this._baseUrl}/items/${_id}/likes`, "PUT");
  };

  removeCardLike = (_id) => {
    return this._secureRequest(`${this._baseUrl}/items/${_id}/likes`, "DELETE");
  };

  updateToken = (token) => {
    this.token = token;
    this._secHeaders.Authorization = `Bearer ${token}`;
  };
}

/******************
 * WEATHER API *
 ******************/

export class WeatherApi {
  constructor() {
    this._latitude = location.latitude;
    this._longitude = location.longitude;
    this._APIkey = "0f6644e4cecfb4b8560776a0d89aaa59";
  }

  // Checks the response from the server
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  // Fetches weather information
  getForecastWeather = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this._latitude}&lon=${this._longitude}&units=imperial&appid=${this._APIkey}`
    ).then(this._checkResponse);
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
