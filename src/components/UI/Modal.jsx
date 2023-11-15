import "./Modal.scss";
import Action from "./Action";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <Action.Tray>
          <Action.Close showText onClick={handleClose} />
        </Action.Tray>
        {children}
      </section>
    </div>
  );
};
export default Modal;
