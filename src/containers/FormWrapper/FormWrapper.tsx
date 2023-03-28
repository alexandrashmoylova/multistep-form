import * as React from "react";
import ContactInfoForm from "../ContactInfoForm/ContactInfoForm";
import DeliveryInfoForm from "../DeliveryInfoForm/DeliveryInfoForm";
import "./FormWrapper.scss";
import type { RootState } from "../../store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const FormWrapper: React.FC = () => {
  const pageStage = useSelector((state: RootState) => state.FormStage)
  // console.log('pagestage', pageStage);
  return (
    <>
      {(pageStage === 1) &&  
        <ContactInfoForm prevButton={false} submitButtonText={'Продолжить'} />
 }  
 {(pageStage === 2) &&  
        <DeliveryInfoForm prevButton={true} submitButtonText={'Отправить'} />
        
      }
    </>
  );
};

export default FormWrapper;
