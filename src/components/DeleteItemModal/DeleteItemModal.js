import "./DeleteItemModal.css";

const DeleteItemModal = ({ item, onClose, onDelete }) => {
  const handleClickOff = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={"delete-item"} onClick={handleClickOff}>
      <div className="delete-item__content">
        {/* Close button to close the modal */}
        <button
          type="button"
          onClick={onClose}
          className="delete-item__close"></button>
        <p className="delete-item__header">
          Are you sure you want to delete this item?
        </p>
        <p className="delete-item__header">This action is Irreversible</p>
        <p
          className="delete-item__delete-btn"
          onClick={() => {
            onDelete(item);
          }}>
          Yes, delete item
        </p>
        <p className="delete-item__cancel-btn" onClick={onClose}>
          Cancel
        </p>
      </div>
    </div>
  );
};

export default DeleteItemModal;
