import "./Main.css";

import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import displayItems from "../../utils/displayItems";
import getTempCategory from "../../utils/getTempCategory";

function Main({ temp, onSetActiveImage, weatherType, day, loading }) {
  // Access the current temperature unit from the context.
  const currentTempUnit = useContext(CurrentTempUnitContext);

  const getConvertedTemp = () => {
    if (currentTempUnit.currentTempUnit === "C") {
      // Convert Fahrenheit to Celsius.
      return Math.round(((temp - 32) * 5) / 9);
    }
    return temp; // Temperature is in Fahrenheit.
  };

  // Determine the weather temperature category.
  const tempCategory = getTempCategory(temp);

  return (
    <main className="main">
      <WeatherCard
        day={day}
        type={weatherType}
        weatherTemp={getConvertedTemp()}
        loading={loading}
      />
      {/* Display temperature-related title. */}
      <p className="main__temp-title">
        {loading
          ? "Loading..."
          : `Today is ${getConvertedTemp()}°${
              currentTempUnit.currentTempUnit
            } / You may want to wear:`}
      </p>
      <div className="main__card-container">
        {/* Map through and render ItemCard components based on the current weather temperature category. */}
        {displayItems(tempCategory, onSetActiveImage)}
      </div>
    </main>
  );
}

export default Main;
