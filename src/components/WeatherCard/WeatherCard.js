//
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ day, type, weatherTemp = "", loading }) {
  const image = weatherOptions.find((img) => {
    return img.day === day && img.type === type;
  });
  const imageUrl = image.url || "";

  return (
    <div className="weather">
      <p className="weather__temp">
        {loading ? "Loading..." : `${weatherTemp}°F`}
      </p>
      <img src={imageUrl} alt="Sunny Weather" className="weather__banner" />
    </div>
  );
}

export default WeatherCard;
