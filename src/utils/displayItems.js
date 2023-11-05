import ItemCard from "../components/ItemCard/ItemCard";

const displayItems = (tempCategory, onSetActiveImage, items) => {
  return items
    .filter((item) => {
      return item.weather.toLowerCase() === tempCategory;
    })
    .map((item) => {
      return (
        <ItemCard onSetActiveImage={onSetActiveImage} item={item}></ItemCard>
      );
    });
};

export default displayItems;
