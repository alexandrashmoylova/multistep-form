import * as React from "react";
import "./ContactInfoForm.scss"
import Input from "../../components/Input/Input";

type ContactInfoFormProps = {
  handler: (e: any) => void;
};

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ handler }) => {
  const [inputValue, setInputValue] = React.useState({
    firstName: "",
    lastName: "",
    tel: "",
    email: "",
  });
  console.log(inputValue);

  const handleChange = (e: any): void => {
    const value = e.currentTarget.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
    console.log("targetName", e.target.name);
  };

  return (
    <form className="form" onSubmit={(e) => handler(e)}>
      <h2 className="title">Основные данные:</h2>
      <Input
        label="Имя:"
        type="text"
        id="firstName"
        name="firstName"
        value={inputValue.firstName}
        required
        placeholder="Введите имя"
        handler={handleChange}
      />
      <Input
        label="Фамилия:"
        type="text"
        id="lastName"
        name="lastName"
        value={inputValue.lastName}
        required
        placeholder="Введите Фамилию"
        handler={handleChange}
      />
      <Input
        label="Телефон:"
        type="tel"
        id="tel"
        name="tel"
        value={inputValue.tel}
        required
        placeholder="Введите телефон"
        handler={handleChange}
      />
      <Input
        label="Email:"
        type="email"
        id="email"
        name="email"
        value={inputValue.email}
        required
        placeholder="Введите email"
        handler={handleChange}
      />
      <div className="form__btn-wrapper">
      <button className="button" type="submit">Продолжить</button>
      </div>
    </form>
  );
};

export default ContactInfoForm;
