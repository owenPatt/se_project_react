const location = { latitude: 43.0347, longitude: -83.518 };

const weatherOptions = [
  // Day
  {
    url: "./images/weather/day/sunny.svg",
    day: true,
    type: "sunny",
    background: { background: "#00A3FF" },
  },
  {
    url: "./images/weather/day/rain.svg",
    day: true,
    type: "rain",
    background: { background: "#368dc0" },
  },
  {
    url: "./images/weather/day/fog.svg",
    day: true,
    type: "fog",
    background: { background: "#368dc0" },
  },
  {
    url: "./images/weather/day/snow.svg",
    day: true,
    type: "snow",
    background: { background: "#368dc0" },
  },
  {
    url: "./images/weather/day/storm.svg",
    day: true,
    type: "storm",
    background: { background: "#368dc0" },
  },
  {
    url: "./images/weather/day/cloudy.svg",
    day: true,
    type: "cloudy",
    background: { background: "#00A3FF" },
  },
  // Night
  {
    url: "./images/weather/night/sunny.svg",
    day: false,
    type: "sunny",
    background: { background: "#286897" },
  },
  {
    url: "./images/weather/night/rain.svg",
    day: false,
    type: "rain",
    background: { background: "#286897" },
  },
  {
    url: "./images/weather/night/fog.svg",
    day: false,
    type: "fog",
    background: { background: "#286897" },
  },
  {
    url: "./images/weather/night/snow.svg",
    day: false,
    type: "snow",
    background: { background: "#286897" },
  },
  {
    url: "./images/weather/night/storm.svg",
    day: false,
    type: "storm",
    background: { background: "#286897" },
  },
  {
    url: "./images/weather/night/cloudy.svg",
    day: false,
    type: "cloudy",
    background: { background: "#286897" },
  },
];

export { location, weatherOptions };
