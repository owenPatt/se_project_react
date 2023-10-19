//
import "./WeatherCard.css";

const weatherOptions = [
  { url: "./images/weather/day/sunny.svg", day: true, type: "sunny" },
  { url: "./images/weather/day/cloudy.svg", day: true, type: "cloudy" },
  { url: "./images/weather/night/sunny.svg", day: false, type: "sunny" },
  { url: "./images/weather/night/cloudy.svg", day: false, type: "cloudy" },
];

function WeatherCard({ day, type }) {
  const image = weatherOptions.filter((img) => {
    return img.day === day && img.type === type;
  });
  const imageUrl = image[0].url || "";

  return (
    <div className="weather">
      <p className="weather__temp">75°F</p>
      <img src={imageUrl} alt="Sunny Weather" className="weather__banner" />
    </div>
  );
}

export default WeatherCard;
