import * as React from "react";
import "./TextInput.scss";

type TextInputProps = {
  label: string;
  id: string;
  name?: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  handler: (e: any) => void;
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  name,
  value,
  required,
  placeholder,
  handler,
}) => {
  return (
    <div className="field-wrapper">
      <label className="form-label" htmlFor={id}>{label}</label>
      <textarea
        className="form-text-input"
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
export default TextInput;
