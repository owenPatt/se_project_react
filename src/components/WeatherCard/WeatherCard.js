import { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function WeatherCard({ weatherTemp = "", loading, day, type }) {
  // Access the current temperature unit from the context.
  const currentTempUnit = useContext(CurrentTempUnitContext);

  // Find the appropriate image for the given time and weather type.
  const image = weatherOptions.find((img) => {
    return img.day === day && img.type === type;
  });
  const imageUrl = image.url || "";

  return (
    // Render the weather card with a dynamic background style.
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
