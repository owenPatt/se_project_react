//
import "./Main.css";
import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function Main({ temp, onSetActiveImage, weatherType, day, loading }) {
  const currentTempUnit = useContext(CurrentTempUnitContext);
  const getWeatherTemp = () => {
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
      return Math.round(((temp - 32) * 5) / 9);
    }
    return temp;
  };

  const weatherTemp = getWeatherTemp();

  return (
    <main className="main">
      <WeatherCard
        day={day}
        type={weatherType}
        weatherTemp={getConvertedTemp()}
        loading={loading}
      />

      <p className="main__temp-title">
        {loading
          ? "Loading..."
          : `Today is ${getConvertedTemp()}°${
              currentTempUnit.currentTempUnit
            } / You may want to wear:`}
      </p>
      <div className="main__card-container">
        {defaultClothingItems
          .filter((item) => {
            return item.weather.toLowerCase() === weatherTemp;
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
