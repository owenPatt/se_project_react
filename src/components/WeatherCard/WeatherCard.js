//
import { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function WeatherCard({ weatherTemp = "", loading, day, type }) {
  const currentTempUnit = useContext(CurrentTempUnitContext);

  const image = weatherOptions.find((img) => {
    return img.day === day && img.type === type;
  });
  const imageUrl = image.url || "";

  return (
    <div className="weather" style={image.background}>
      <p className="weather__temp">
        {loading
          ? "Loading..."
          : `${weatherTemp}°${currentTempUnit.currentTempUnit}`}
      </p>
      <img className="weather__image" src={imageUrl} />
    </div>
  );
}

export default WeatherCard;
