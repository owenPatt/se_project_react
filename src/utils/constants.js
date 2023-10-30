const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

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

export { defaultClothingItems, location, weatherOptions };
