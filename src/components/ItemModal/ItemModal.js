import "./ItemModal.css";

const ItemModal = ({
  title = "Clothes",
  imageSrc,
  weather = "Hot",
  onClose,
}) => {
  return (
    <div className={"item-modal"}>
      <div className="item-modal__content">
        <button
          type="button"
          onClick={onClose}
          className="item-modal__close"></button>
        <img src={imageSrc} alt={title} className="item-modal__picture" />
        <div className="item-modal__body">
          <p className="item-modal__title">{title}</p>
          <p className="item-modal__description">Weather: {weather}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
