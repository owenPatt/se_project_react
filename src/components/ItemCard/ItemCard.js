import "./ItemCard.css";

function ItemCard({ item, onSetActiveImage }) {
  return (
    <div className="item-card">
      <div className="item-card__label">
        <p className="item-card__label-text">{item.name}</p>
      </div>
      <img
        className="item-card__image"
        src={item.link}
        alt={item.name}
        onClick={() => {
          onSetActiveImage(item.link);
        }}
      />
    </div>
  );
}

export default ItemCard;
