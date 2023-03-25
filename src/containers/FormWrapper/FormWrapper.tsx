import * as React from "react";
import ContactInfoForm from "../ContactInfoForm/ContactInfoForm";
import DeliveryInfoForm from "../DeliveryInfoForm/DeliveryInfoForm";
import "./FormWrapper.scss";
import type { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { updateContactInfo } from "../../features/form/contactFormSlice";
import { FormState } from "../../features/form/contactFormSlice";

const FormWrapper: React.FC = () => {
  const [secondStep, setSecondStep] = React.useState(false);

  // здесь получаю из глобального хранилища state useSelector возвращает initialState(т.е. пустой объект)
  const state = useSelector((state: RootState) => state.form);

  // диспетчер, с его помощью я соединяю компонент и store
  const dispatch = useDispatch();
  

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    const data: FormState = { ...state };
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form.elements);
    Object.values(form.elements).forEach((el: HTMLInputElement) => {
      if (el.id) {
        if (Object.keys(data).includes(el.id))
        data[el.id as keyof FormState] = el.value;
      }
    });
    dispatch(updateContactInfo(data));
    setSecondStep(true);
  };

  // const handleDeliveryInfoSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
  //   const data: DeliveryFormState = { ...deliveryInfoState };
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   console.log(form.elements);
  //   Object.values(form.elements).forEach((el: HTMLInputElement) => {
  //     if (el.id) {
  //       if (Object.keys(data).includes(el.id))
  //       data[el.id as keyof DeliveryFormState] = el.value;
  //     }
  //   });
  //   dispatch(updateDeliveryInfo(data));
  //   setSecondStep(true);
  // };

  const goBack = () => {
    setSecondStep(false);
  };


  return (
    <>
      {!secondStep ? (
        <ContactInfoForm handler={handleSubmit} />
      ) : (
        <DeliveryInfoForm handler={handleSubmit} />
      )}
      {/* {secondStep && <button className="button" onClick={goBack}>Назад</button>} */}
    </>
  );
};

export default FormWrapper;
