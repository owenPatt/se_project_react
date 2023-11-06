import ItemCard from "../components/ItemCard/ItemCard";

const displayItems = (tempCategory, onSetActiveImage, items) => {
  if (!items.filter) {
    return false;
  }
  return items
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
