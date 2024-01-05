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
        <section className="modal-child">{children}</section>
      </section>
    </div>
  );
};
export default Modal;
