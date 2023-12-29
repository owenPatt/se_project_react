import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemsList({
  tempCategory,
  onSetActiveImage,
  items,
  onCardLike,
  showLikeButton = true,
  showAllItems = true,
}) {
  const user = useContext(CurrentUserContext);
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

            if (showAllItems) {
              return item.weather.toLowerCase() === tempCategory && item.owner;
            }

            return (
              item.weather.toLowerCase() === tempCategory &&
              item.owner === user._id
            );
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                onSetActiveImage={onSetActiveImage}
                item={item}
                onCardLike={onCardLike}
                showLikeButton={showLikeButton}></ItemCard>
            );
          })}
    </>
  );
}

export default ItemsList;
