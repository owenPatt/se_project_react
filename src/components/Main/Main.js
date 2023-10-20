//
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../util/constants";

function Main({ onSetActiveImage }) {
  const weatherTemp = "75°F";
  return (
    <main className="main">
      <WeatherCard day={true} type={"cloudy"} weatherTemp={weatherTemp} />

      <p className="main__temp-title">
        Today is {weatherTemp} / You may want to wear:
      </p>
      <div className="main__card-container">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              onSetActiveImage={onSetActiveImage}
              item={item}></ItemCard>
          );
        })}
      </div>
    </main>
  );
}

export default Main;
