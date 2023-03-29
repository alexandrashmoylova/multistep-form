import * as React from "react";
import "./ContactInfoForm.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formStage, formInfo } from "../../features/form/formSlice";
import type { ContactInfo } from "../../features/form/formSlice";
import type { RootState } from "../../store";
import Input from "../../components/Input/Input";

export interface Errors {
  firstName: string;
  lastName: string;
  tel: string;
  email: string;
}

const ErrorsValue: Errors = {
  firstName: "",
  lastName: "",
  tel: "",
  email: ""
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
  console.log('inputValueTel', inputValue.tel);


// проверку засунуть сюда
  const handleChange = (e: any): void => {
    const {name, value} = e.target;
    setInputValue({ 
      ...inputValue, 
      [name]: value,
    });
    // console.log("targetName", e.target.name);
  };

  // const validatePhone = (value: any) => {
  //   const regex = /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/;
  //   if (regex.test(value) == true) {
  //     // Valid international phone number
  //     console.log('правильно тел');
  // } else {
  //   console.log("неправильно");
  //     // Invalid international phone number
  // }
  // }

// validatePhone(inputValue.tel);
  // console.log(validtel);


  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    email: ""
  })
  console.log("errors", errors);
  
  const validate = (inputValue: any) => {

    const formErrors: Errors = {
      firstName: "",
      lastName: "",
      tel: "",
      email: ""
    } // set form errors to none at start
    console.log('formErrors', formErrors);

    // name
    if(!inputValue.name){
      formErrors.firstName = "Имя обязательно";
    }
    
    // email
    const emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(!inputValue.email || !emailRegex.test(inputValue.email)) {
      formErrors.email = 'Введите правильный email';
    }

    return formErrors
  }
  

  // const validation = () => {
  //   if(!validtel) {
  //     console.log('правильно тел');
  //   } else {
  //     console.log("неправильно");
      
  //   }
    
  // }
  const [isSubmitted, setIsSubmitted] = useState(false) 

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // setErrors(validate(inputValue));
    // validatePhone(inputValue.tel);
    
    dispatch(formStage(2));
    dispatch(
      formInfo({
        firstName: inputValue.firstName,
        lastName: inputValue.lastName,
        tel: inputValue.tel,
        email: inputValue.email,
      })
    );
    setErrors(validate(inputValue))
    setIsSubmitted(true);
  };

  useEffect(() => {
    console.log('errors', errors);
    if(Object.keys(errors).length === 0 && isSubmitted) {
      console.log(inputValue);
      
    }
    
  }, [errors])

  // useEffect(() => {
  //  if (isSubmitted)  {
  //     dispatch(formStage(2));
  //     dispatch(
  //       formInfo({
  //         firstName: inputValue.firstName,
  //         lastName: inputValue.lastName,
  //         tel: inputValue.tel,
  //         email: inputValue.email,
  //       })
  //     );
  //   }
  // }, [inputValue, isSubmitted, dispatch]);

  // console.log('inputValue', inputValue, errors);
  

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
      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
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
        type="tel"
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
          <input className="button" type="submit" value={submitButtonText} />
      </div>
    </form>
  );
};

export default ContactInfoForm;
