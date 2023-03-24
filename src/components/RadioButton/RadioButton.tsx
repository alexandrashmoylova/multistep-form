import * as React from 'react';

type RadioButton = {
  label: string,
  type: string,
  id: string;
  value: string
  isSelected: boolean,
  changed: (e: any) => void;
}

const RadioButton: React.FC<RadioButton> = ({
  label,
  type,
  id,
  value,
  isSelected,
  changed
}) => {
  return (
    <div>
    <label htmlFor={id}>
      {label}
      <input type={type} id={id} value={value} checked={isSelected} onChange={changed}/>
    </label>
  </div>
  )
}
export default RadioButton;