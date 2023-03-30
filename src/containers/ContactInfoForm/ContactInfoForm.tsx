import * as React from "react";
import "./ContactInfoForm.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formStage, formInfo } from "../../features/form/formSlice";
import type { RootState } from "../../store";
import Input from "../../components/Input/Input";

export interface Errors {
  firstName: string;
  lastName: string;
  tel: string;
  email: string;
}

type ContactInfoFormProps = {
  submitButtonText: string;
  prevButton: boolean;
};

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  prevButton,
  submitButtonText,
}) => {
  const dispatch = useDispatch();

  const initialErrors = {
    firstName: "",
    lastName: "",
    tel: "",
    email: "",
  };

  const currentStage = useSelector((state: RootState) => state.FormStage);
  const formstageFirstName = useSelector(
    (state: RootState) => state.FormContactInfo.firstName
  );
  const formstageLastName = useSelector(
    (state: RootState) => state.FormContactInfo.lastName
  );
  const formstageTel = useSelector(
    (state: RootState) => state.FormContactInfo.tel
  );
  const formstageEmail = useSelector(
    (state: RootState) => state.FormContactInfo.email
  );
  const [inputValue, setInputValue] = useState({
    firstName: formstageFirstName,
    lastName: formstageLastName,
    tel: formstageTel,
    email: formstageEmail,
  });

  const [errors, setErrors] = useState(initialErrors);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: any): void => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const validate = (inputValue: any) => {
    let formErrors = {
      firstName: "",
      lastName: "",
      tel: "",
      email: "",
    };
    // console.log("formErrors", formErrors);

    if (!inputValue.firstName) {
      formErrors.firstName = "Имя обязательно";
    }

    if (!inputValue.lastName) {
      formErrors.lastName = "Фамилия обязательно";
    }

    const telRegex = new RegExp(/^([+]?[0-9\s-\(\)]{3,25})*$/i);
    if (!telRegex.test(inputValue.tel)) {
      formErrors.tel = "Введите корректный формат телефеона с кодом страны";
    }
    if (!inputValue.tel) {
      formErrors.tel = "Телефон обязательно";
    }

    const emailRegex = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!emailRegex.test(inputValue.email)) {
      formErrors.email = "Введите корректный формат email: 'ivanov@mail.ru'";
    }
    if (!inputValue.email) {
      formErrors.email = "Email обязательно";
    }

    return formErrors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrors(validate(inputValue));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (Object.values(errors).every((el) => el === "") && isSubmitted) {
      dispatch(formStage(2));
      dispatch(
        formInfo({
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
          tel: inputValue.tel,
          email: inputValue.email,
        })
      );
    }
  }, [inputValue, isSubmitted, dispatch, errors]);

  return (
    <form noValidate={true} className="form" onSubmit={handleSubmit}>
      <h2 className="title">Основные данные:</h2>
      <div className="form-wrapper-input">
        <Input
          label="Имя:"
          type="text"
          id="firstName"
          name="firstName"
          value={inputValue.firstName}
          placeholder="Введите имя"
          handler={handleChange}
        />
        {errors.firstName && (
          <span className="error-message">{errors.firstName}</span>
        )}
      </div>
      <div className="form-wrapper-input">
        <Input
          label="Фамилия:"
          type="text"
          id="lastName"
          name="lastName"
          value={inputValue.lastName}
          placeholder="Введите Фамилию"
          handler={handleChange}
        />
        {errors.lastName && (
          <span className="error-message">{errors.lastName}</span>
        )}
      </div>
      <div className="form-wrapper-input">
        <Input
          label="Телефон:"
          type="tel"
          id="tel"
          name="tel"
          value={inputValue.tel}
          placeholder="Введите телефон"
          handler={handleChange}
        />
        {errors.tel && <span className="error-message">{errors.tel}</span>}
      </div>
      <div className="form-wrapper-input">
        <Input
          label="Email:"
          type="email"
          id="email"
          name="email"
          value={inputValue.email}
          placeholder="Введите email"
          handler={handleChange}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div className="form__btn-wrapper">
        {prevButton && (
          <input
            className="button button-back"
            type="submit"
            value={`Назад`}
            onClick={() => dispatch(formStage(currentStage - 1))}
          />
        )}
        <input className="button" type="submit" value={submitButtonText} />
      </div>
    </form>
  );
};

export default ContactInfoForm;
