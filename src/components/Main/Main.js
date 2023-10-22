//
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherTemp, onSetActiveImage, type }) {
  const getWeatherType = () => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType();

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
