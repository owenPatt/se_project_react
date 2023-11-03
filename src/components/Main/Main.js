import "./Main.css";

import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function Main({ temp, onSetActiveImage, weatherType, day, loading }) {
  // Access the current temperature unit from the context.
  const currentTempUnit = useContext(CurrentTempUnitContext);

  const getTempCategory = () => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };

  const getConvertedTemp = () => {
    if (currentTempUnit.currentTempUnit === "C") {
      // Convert Fahrenheit to Celsius.
      return Math.round(((temp - 32) * 5) / 9);
    }
    return temp; // Temperature is in Fahrenheit.
  };

  // Determine the weather temperature category.
  const tempCategory = getTempCategory();

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
        {defaultClothingItems
          .filter((item) => {
            return item.weather.toLowerCase() === tempCategory;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                onSetActiveImage={onSetActiveImage}
                item={item}></ItemCard>
            );
          })}
      </div>
    </main>
  );
}

export default Main;
