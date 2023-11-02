import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function ToggleSwitch({}) {
  const currentTempUnit = useContext(CurrentTempUnitContext);

  return (
    <label className="toggle-switch">
      <input
        className="toggle-switch__input"
        type="checkbox"
        onChange={currentTempUnit.handleToggleSwitchChange}
      />
      <span className="toggle-switch__slider">
        <span className="toggle-switch__label">F</span>
        <span className="toggle-switch__label">C</span>
      </span>
    </label>
  );
}

export default ToggleSwitch;
