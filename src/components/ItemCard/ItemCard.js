import "./ItemCard.css";

function ItemCard({ item, onSetActiveImage }) {
  return (
    <div className="item-card">
      <div className="item-card__label">
        {/* Display the item name. */}
        <p className="item-card__label-text">{item.name}</p>
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
