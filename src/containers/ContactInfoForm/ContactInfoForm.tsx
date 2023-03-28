import * as React from "react"
import "./ContactInfoForm.scss"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { formStage, formInfo } from "../../features/form/formSlice"
import type { RootState } from "../../store"
import Input from "../../components/Input/Input"

type ContactInfoFormProps = {
  submitButtonText: string;
  prevButton: boolean;
};

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ prevButton, submitButtonText }) => {
  const currentStage = useSelector((state: RootState) => state.FormStage) // for previous button
  const formstageFirstName = useSelector((state: RootState) => state.FormContactInfo.firstName)
  const formstageLastName = useSelector((state: RootState) => state.FormContactInfo.lastName)
  const formstageTel = useSelector((state: RootState) => state.FormContactInfo.tel)
  const formstageEmail = useSelector((state: RootState) => state.FormContactInfo.email)
  const [inputValue, setInputValue] = useState({
    firstName: formstageFirstName,
    lastName: formstageLastName,
    tel: formstageTel,
    email: formstageEmail,
  });
  console.log(inputValue);

  const handleChange = (e: any): void => {
    const value = e.currentTarget.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
    console.log("targetName", e.target.name);
  };

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault(); // stop form submission // check errors
    setIsSubmitted(true) // update submit status
  }

  const dispatch = useDispatch();

  useEffect(() => {
    // update Redux Slice
    if (isSubmitted) {
      dispatch(
        formStage(2) // update formStage
      )
      dispatch(
        formInfo({ // update formSignup
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
          tel: inputValue.tel,
          email: inputValue.email,
        })
      )
    }

}, [inputValue, isSubmitted, dispatch])

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
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
          {(prevButton) && 
            <div>
              <input 
                className="button"
                  type="submit" 
                  value={`Назад`}
                  onClick={() => dispatch(formStage(currentStage-1))}
                />
            </div>
          }
          <div>
            <input 
            className="button"
              type="submit" 
              value={ submitButtonText || 'Отправить' } 
            />
          </div>
      </div>
    </form>
  );
};

export default ContactInfoForm;
