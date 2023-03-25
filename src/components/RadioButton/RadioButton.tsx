import * as React from 'react';
import "./RadioButton.scss"

type RadioButton = {
  label: string,
  type: string,
  id: string,
  name: string,
  value: string,
  isSelected: boolean,
  changed: (e: any) => void;
}

const RadioButton: React.FC<RadioButton> = ({
  label,
  type,
  id,
  name,
  value,
  isSelected,
  changed
}) => {
  return (
    <div>
    <label className="form-label" htmlFor={id}>
      {label}
      <input className="form-radio-button" type={type} id={id} name={name} value={value} checked={isSelected} onChange={changed}/>
      <span className="form-radio-checkmark"></span>
    </label>
  </div>
  )
}
export default RadioButton;