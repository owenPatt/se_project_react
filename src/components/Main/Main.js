import "./Main.css";

import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import CurrentTempUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ItemsList from "../ItemsList/ItemsList";
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
        <ItemsList
          tempCategory={tempCategory}
          onSetActiveImage={onSetActiveImage}
          items={clothingItems}
          onCardLike={onCardLike}
        />
        <ItemCard show={false} />
      </div>
    </main>
  );
}

export default Main;
