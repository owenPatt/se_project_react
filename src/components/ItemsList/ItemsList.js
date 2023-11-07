import ItemCard from "../ItemCard/ItemCard";

function ItemsList({ tempCategory, onSetActiveImage, items }) {
  const checkItems = () => {
    if (!Array.isArray(items) && items !== undefined) {
      return false;
    }
    return true;
  };
  return (
    <>
      {checkItems() &&
        items
          .filter((item) => {
            if (!item.weather || !item.imageUrl || !item.name) {
              console.error(`Item ${item} is not created correctly`);
              return false;
            }
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
    </>
  );
}

export default ItemsList;
