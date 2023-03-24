import * as React from "react";
// import countries from "./utils/countries"

export const countries: string[] = [
  "Казахстан",
  "Турция",
  "Армения",
  "Таджикистан",
  "Грузия",
];

type SelectProps = {
  label: string;
  id: string;
  name?: string;
  value: string;
  required?: boolean;
};

const Select: React.FC<SelectProps> = ({
  label,
  id,
  name,
  value,
  required,
}) => {
  const [country, setCountry] = React.useState("");
  console.log(country);
  const options = countries.map((text, index) => {
    return <option key={index}>{text}</option>;
  });
  return (
    <div className="field-wrapper">
      <label htmlFor={id}>{label}</label>
      <select
        name={name}
        id={id}
        value={country}
        required={required}
        onChange={(e) => setCountry(e.target.value)}
      >
        {options}
      </select>
    </div>
  );
};
export default Select;
