//
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  name,
  buttonText = "Submit",
  title = "Form",
  onClose,
  onSubmit,
  secFunc = "",
  secFuncOnClick = () => {},
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
        <form className="modal__form" onSubmit={onSubmit}>
          {/* Render the inside of the form */}
          {children}

          <div className="modal__buttons">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            <p className="modal__sec-func" onClick={secFuncOnClick}>
              {secFunc}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
