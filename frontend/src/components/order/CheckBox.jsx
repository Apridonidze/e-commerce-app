import { useState } from "react";
import "./checkbox.css";

export default function CustomCheckbox({ checked: initial = false, onChange }) {
  const [checked, setChecked] = useState(initial);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`checkbox ${checked ? "checked" : ""}`} onClick={handleToggle}>
      {checked && <span className="checkmark">✔</span>}
    </div>
  );
}