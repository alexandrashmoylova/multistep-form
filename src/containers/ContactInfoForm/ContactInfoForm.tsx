import * as React from "react";
import "./ContactInfoForm.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formStage, formInfo, addDataAsync } from "../../features/form/formSlice";
import type { ContactInfo } from "../../features/form/formSlice";
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
  const currentStage = useSelector((state: RootState) => state.FormStage); // for previous button
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
  console.log(inputValue);

  const handleChange = (e: any): void => {
    const value = e.currentTarget.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
    // console.log("targetName", e.target.name);
  };
  
  // interface formErrorsType {
  //   firstName: string,
  //   lasrName: string,
  //   tel: string,
  //   email: string,
  // }
  

  // form validation checks
  // const [errors, setErrors] = useState({inputValue})
  // console.log('errors', errors);
  
  // const validate = (inputValue: any) => {

  //   let formErrors : {
  //     firstName: string,
  //     lasrName: string,
  //     tel: string,
  //     email: string,
  //   }
  //   console.log('formerrors', formErrors);
    

  //   // name
  //   if(!inputValue.firstName){
  //     formErrors.firstName = "Name required";
  //   }
    
  //   // email
  //   const emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  //   if(!inputValue.email || !emailRegex.test(inputValue.email)) {
  //     formErrors.email = 'Valid Email required';
  //   }

  //   return formErrors
  // }

  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(isSubmitted);
  
// console.log(validate(inputValue));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // setErrors(validate(inputValue));
    setIsSubmitted(true);
    addDataAsync(inputValue);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSubmitted) {
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
  }, [inputValue, isSubmitted, dispatch]);

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <h2 className="title">Основные данные:</h2>
      <Input
        label="Имя:"
        type="text"
        id="firstName"
        name="firstName"
        value={inputValue.firstName}
        placeholder="Введите имя"
        handler={handleChange}
      />
      {/* {errors.firstName && <span className="error-message">{errors.firstName}</span>} */}
      <Input
        label="Фамилия:"
        type="text"
        id="lastName"
        name="lastName"
        value={inputValue.lastName}
        placeholder="Введите Фамилию"
        handler={handleChange}
      />
      <Input
        label="Телефон:"
        type="number"
        id="tel"
        name="tel"
        value={inputValue.tel}
        placeholder="Введите телефон"
        handler={handleChange}
      />
      <Input
        label="Email:"
        type="email"
        id="email"
        name="email"
        value={inputValue.email}
        placeholder="Введите email"
        handler={handleChange}
      />
      <div className="form__btn-wrapper">
        {/* {prevButton && (
          <div>
            <input
              className="button button-back"
              type="submit"
              value={`Назад`}
              onClick={() => dispatch(formStage(currentStage - 1))}
            />
          </div>
        )} */}
        <div>
          <input className="button" type="submit" value={submitButtonText} />
        </div>
      </div>
    </form>
  );
};

export default ContactInfoForm;
