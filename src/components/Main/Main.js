//
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../util/constants";
import { useMemo } from "react";

function Main({ weatherTemp, onSetActiveImage, type }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  return (
    <main className="main">
      <WeatherCard day={true} type={"cloudy"} weatherTemp={weatherTemp} />

      <p className="main__temp-title">
        Today is {weatherTemp}°F / You may want to wear:
      </p>
      <div className="main__card-container">
        {defaultClothingItems
          .filter((item) => {
            return item.weather.toLowerCase() === weatherType;
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
