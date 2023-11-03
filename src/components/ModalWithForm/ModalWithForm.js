//
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  name,
  buttonText = "Submit",
  title = "Form",
  onClose,
}) {
  // Used to close modal when clicked off
  const handleClickOff = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal modal_type_${name}`} onClick={handleClickOff}>
      <div className="modal__content">
        {/* Close button to close the modal */}
        <button
          type="button"
          onClick={onClose}
          className="modal__close"></button>
        <p className="modal__title">{title}</p>
        <form className="modal__form">
          {/* Render the inside of the form */}
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
