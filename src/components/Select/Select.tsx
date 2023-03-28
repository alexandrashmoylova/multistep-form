import * as React from "react";
// import countries from "./utils/countries"

export const countries: string[] = [
  "Россия",
  "Казахстан",
  "Турция",
  "Армения",
  "Таджикистан",
  "Грузия",
];

type SelectProps = {
  label: string,
  id: string,
  name?: string,
  value: string,
  required?: boolean,
  handler: (e: any) => void,

};

const Select: React.FC<SelectProps> = ({
  label,
  id,
  name,
  value,
  required,
  handler,
}) => {
  const options = countries.map((text, index) => {
    return <option key={index}>{text}</option>;
  });
  return (
    <div className="field-wrapper">
      <label className="form-label" htmlFor={id}>{label}</label>
      <select
        className="form-input"
        name={name}
        id={id}
        value={value}
        required={required}
        onChange={(e)=>handler(e)}
      >
        {options}
      </select>
    </div>
  );
};
export default Select;
