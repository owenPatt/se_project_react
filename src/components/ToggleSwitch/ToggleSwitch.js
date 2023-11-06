import { useContext } from "react";
import "./ToggleSwitch.css";

// Import the CurrentTempUnitContext to access the current temperature unit and toggle function.
import CurrentTempUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch({}) {
  // Access the current temperature unit and toggle function from the context
  const currentTempUnit = useContext(CurrentTempUnitContext);

  return (
    <label className="toggle-switch">
      <input
        className="toggle-switch__input"
        type="checkbox"
        onChange={currentTempUnit.handleToggleSwitchChange} // Trigger the toggle function on change.
      />
      <span className="toggle-switch__slider">
        <span className="toggle-switch__label">F</span>
        <span className="toggle-switch__label">C</span>
      </span>
    </label>
  );
}
export default ToggleSwitch;
