import * as React from "react";
import "./RadioButton.scss";

type RadioButtonProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  required?: boolean;
  isSelected: boolean;
  changed: (e: any) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  type,
  id,
  name,
  value,
  required,
  isSelected,
  changed,
}) => {
  return (
    <div>
      <label className="form-label form-radio-label" htmlFor={id}>
        {label}
        <input
          className="form-radio-button"
          type={type}
          id={id}
          name={name}
          value={value}
          required={required}
          checked={isSelected}
          onChange={changed}
        />
        <span className="form-radio-checkmark"></span>
      </label>
    </div>
  );
};
export default RadioButton;
