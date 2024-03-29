import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemsList({
  tempCategory,
  onSetActiveImage,
  items,
  onCardLike,
  showAllItems = true,
}) {
  const user = useContext(CurrentUserContext);
  return (
    <>
      {items
        .filter((item) => {
          if (showAllItems) {
            return item.weather.toLowerCase() === tempCategory && item.owner;
          }

          return item.owner === user._id;
        })
        .map((item) => {
          return (
            <ItemCard
              key={item._id}
              onSetActiveImage={onSetActiveImage}
              item={item}
              onCardLike={onCardLike}></ItemCard>
          );
        })}
    </>
  );
}

export default ItemsList;
