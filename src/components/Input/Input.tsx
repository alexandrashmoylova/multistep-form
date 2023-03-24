import * as React from 'react';

type InputProps = {
  label: string,
  type: string,
  id: string,
  name?: string;
  value: string,
  required?: boolean,
  placeholder: string,
  handler: (e: any) => void
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  name,
  value,
  required,
  placeholder,
  handler
}) => {
  // const [inputValue, setInputValue] = React.useState({
  //   firstName: '',
  //   lastName: '',
  //   tel: '',
  //   email: '',
  // });
  // console.log(inputValue);
  
  // const handleChange = (e: any) => {
  //   const value = e.currentTarget.value;
  //   setInputValue( {...inputValue, [e.target.name]: value});
  // }
  return (
    <div className="field-wrapper">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(e)=>handler(e)}
    />
  </div>
  )
}
export default Input;