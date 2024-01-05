import PropTypes from "prop-types";
import { useState } from "react";
import "./Action.scss";

// Action Button ---------------------------

export default function Action({ children, onClick, showText, buttonText }) {
  return (
    <button className="Action" onClick={onClick}>
      {children} {showText && <p>{buttonText}</p>}
    </button>
  );
}

Action.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
};

// Action Tray -----------------------------

Tray.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export function Tray({ children }) {
  return <div className="ActionTray">{children}</div>;
}

// -----------------------------------------
// Actions ---------------------------------
// -----------------------------------------

const ActionPropTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string,
};

Cancel.propTypes = ActionPropTypes;

export function Cancel({ onClick, showText = false, buttonText = "Cancel" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Close.propTypes = ActionPropTypes;

export function Close({ onClick, showText = false, buttonText = "×" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Submit.propTypes = ActionPropTypes;

export function Submit({ onClick, showText = false, buttonText = "Submit" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Toggle.propTypes = ActionPropTypes;
Toggle.propTypes = {
  onClickTrue: PropTypes.func,
  onClickFalse: PropTypes.func,
};

export function Toggle({ showText = true, onClickTrue, onClickFalse }) {
  const [isToggled, toggle] = useState(false);
  const toggleOnOffStyle = isToggled ? "ToggleFalse" : "ToggleTrue";
  const toggleOnOffText = isToggled ? "✓" : "X";
  const clicked = () => {
    console.log(isToggled);
    if (isToggled == true) {
      onClickTrue();
    } else {
      onClickFalse();
    }
    toggle(!isToggled);
  };
  return (
    <div className={toggleOnOffStyle}>
      <Action
        buttonText={toggleOnOffText}
        onClick={() => clicked()}
        showText={showText}
      ></Action>
    </div>
  );
}

// -----------------------------------------
// Compose Action Object -------------------
// -----------------------------------------

Action.Tray = Tray;

Action.Cancel = Cancel;
Action.Close = Close;
Action.Submit = Submit;
Action.Toggle = Toggle;
