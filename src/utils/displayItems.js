import { defaultClothingItems } from "./constants";
import ItemCard from "../components/ItemCard/ItemCard";

const displayItems = (tempCategory, onSetActiveImage) => {
  return defaultClothingItems
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
    });
};

export default displayItems;
