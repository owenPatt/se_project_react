import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onSetActiveImage, onCardLike, show = true }) {
  const user = useContext(CurrentUserContext);

  if (!show) {
    return false;
  }

  let isLiked = item.likes.some((id) => id === user._id);
  let likeButtonClass = "item-card__like-icon_invisible";
  if (user.name) {
    likeButtonClass = "";
  }

  const handleLikeClick = () => {
    if (onCardLike(item._id, isLiked)) {
      isLiked = !isLiked;
    }
  };

  return (
    <div className="item-card">
      <div className="item-card__label">
        {/* Display the item name. */}
        <p className="item-card__label-text">{item.name}</p>
        <img
          className={`item-card__like-icon ${likeButtonClass}`}
          src={
            isLiked
              ? "./images/liked_like_button.svg"
              : "./images/Like_button.svg"
          }
          alt="icon"
          onClick={handleLikeClick}
        />
      </div>
      {/* Image for the item card. */}
      <img
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
        // Attach a click event to set the active image.
        onClick={() => {
          onSetActiveImage(item);
        }}
      />
    </div>
  );
}

// Export the ItemCard component as the default export.
export default ItemCard;
