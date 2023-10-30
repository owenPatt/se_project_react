//
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherTemp = "", loading, day, type }) {
  const image = weatherOptions.find((img) => {
    return img.day === day && img.type === type;
  });
  const imageUrl = image.url || "";

  return (
    <div className="weather" style={image.background}>
      <p className="weather__temp">
        {loading ? "Loading..." : `${weatherTemp}°F`}
      </p>
      <img className="weather__image" src={imageUrl} />
    </div>
  );
}

export default WeatherCard;
