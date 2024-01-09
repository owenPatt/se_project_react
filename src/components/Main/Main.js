import "./Main.css";

import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import CurrentTempUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ItemCard from "../ItemCard/ItemCard";
import getTempCategory from "../../utils/getTemperatureCategory";

function Main({
  temp,
  onSetActiveImage,
  weatherType,
  day,
  loading,
  clothingItems,
  onCardLike,
}) {
  // Access the current temperature unit from the context.
  const currentTempUnit = useContext(CurrentTempUnitContext);

  const getConvertedTemp = () => {
    if (currentTempUnit.currentTemperatureUnit === "C") {
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
              currentTempUnit.currentTemperatureUnit
            } / You may want to wear:`}
      </p>
      <div className="main__card-container">
        {/* Map through and render ItemCard components based on the current weather temperature category. */}
        {clothingItems
          .filter((item) => {
            return item.weather.toLowerCase() === tempCategory && item.owner;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                onSetActiveImage={onSetActiveImage}
                item={item}
                onCardLike={onCardLike}></ItemCard>
            );
          })}
      </div>
    </main>
  );
}

export default Main;
