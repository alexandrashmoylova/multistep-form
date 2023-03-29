import * as React from "react";
import ContactInfoForm from "../ContactInfoForm/ContactInfoForm";
import DeliveryInfoForm from "../DeliveryInfoForm/DeliveryInfoForm";
import Success from "../../components/Succes/Success";
import Error from "../../components/Error/Error";
import "./FormWrapper.scss";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";

const FormWrapper: React.FC = () => {
  const pageStage = useSelector((state: RootState) => state.FormStage);
  // console.log('pagestage', pageStage);
  return (
    <>
      <div className="form-wrapper">
        {pageStage === 1 && (
          <ContactInfoForm prevButton={false} submitButtonText={"Продолжить"} />
        )}
        {pageStage === 2 && (
          <DeliveryInfoForm prevButton={true} submitButtonText={"Отправить"} />
        )}
        {pageStage === 3 && (
          <Success title="Готово!" message="Ваши данные успешно отправлены!" />
        )}
        {pageStage === 4 && (
          <Error title="Упс!" message="Что-то пошло не так:(" />
        )}
      </div>
    </>
  );
};

export default FormWrapper;
