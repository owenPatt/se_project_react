//
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  name,
  buttonText = "Submit",
  title = "Form",
  onClose,
}) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__close"></button>
        <p className="modal__title">{title}</p>
        <form className="modal__form">
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
