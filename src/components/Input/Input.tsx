import * as React from "react";
import "./Input.scss";

type InputProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  handler: (e: any) => void;
};

const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  name,
  value,
  required,
  placeholder,
  handler,
}) => {
  return (
    <div className="field-wrapper">
      <label className="form-label" htmlFor={id}>
        {label}
        <span>*</span>
      </label>
      <input
        className="form-input"
        type={type}
        id={id}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => handler(e)}
      />
    </div>
  );
};
export default Input;
