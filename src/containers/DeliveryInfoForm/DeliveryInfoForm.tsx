import * as React from "react"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./DeliveryInfoForm.scss"
import Input from "../../components/Input/Input"
import RadioButton from "../../components/RadioButton/RadioButton"
import Select from "../../components/Select/Select"
import TextInput from "../../components/TextInput/TextInput"
import type { RootState } from "../../store"
import { formStage, formDelivery } from "../../features/form/formSlice"


type DeliveryInfoFormProps = {
  submitButtonText: string;
  prevButton: boolean;
}


const DeliveryInfoForm: React.FC<DeliveryInfoFormProps> = ({ submitButtonText, prevButton }) => {
  const dispatch = useDispatch();

  const currentStage = useSelector((state: RootState) => state.FormStage) // for previous button
  const formstageDelivery = useSelector((state: RootState) => state.FormDeliveryInfo.delivery)
  const formstageCountry = useSelector((state: RootState) => state.FormDeliveryInfo.country)
  const formstageCity = useSelector((state: RootState) => state.FormDeliveryInfo.city)
  const formstageZipcode = useSelector((state: RootState) => state.FormDeliveryInfo.zipcode)
  const formstageComment = useSelector((state: RootState) => state.FormDeliveryInfo.comment)
  const formstageDate = useSelector((state: RootState) => state.FormDeliveryInfo.date)

  const [checkedValue, setChekedValue] = useState(formstageDelivery);

  const radioChangeHandler = (e: any) => {
    const value = e.currentTarget.value;
    setChekedValue(value);
    setInputValue({ ...inputValue, delivery: value });
  };
  // console.log("changeDelivery", checkedValue);
  

  const [country, setCountry] = useState(formstageCountry);


  const [inputValue, setInputValue] = useState({
    delivery: formstageDelivery,
    country: formstageCountry,
    city: formstageCity,
    zipcode: formstageZipcode,
    date: formstageDate,
    comment: formstageComment,
  });
  console.log(inputValue);


  

  const handleCountryChange = (e: any): void => {
    const value = e.currentTarget.value;
    setCountry(value);
    setInputValue({ ...inputValue, country: value });
    // console.log("country", e.target.name);
  };


  const handleChange = (e: any): void => {
    const value = e.currentTarget.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
    console.log("targetName", e.target.name);
  };

  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
  }

  useEffect(() => {
    if (isSubmitted) { 
      dispatch(
        formStage(3)
      )
      dispatch(
        formDelivery({
          delivery: inputValue.delivery,
          country: inputValue.country,
          city: inputValue.city,
          zipcode: inputValue.zipcode,
          date: inputValue.date,
          comment: inputValue.comment,
        })
      );

    }

  }, [inputValue, isSubmitted, dispatch])

  return (
    <form className="form" action="" onSubmit={(e)=>handleSubmit(e)}>
      <h2 className="title">Адрес доставки:</h2>
      <div className="form__wrapper-radio">
      <RadioButton
        label="Доставка"
        type="radio"
        id="delivery"
        name="delivery"
        value="delivery"
        isSelected={checkedValue === "delivery"}
        changed={radioChangeHandler}
      />
      <RadioButton
        label="Самовывоз"
        type="radio"
        id="pickup"
        name="pickup"
        value="pickup"
        isSelected={checkedValue === "pickup"}
        changed={radioChangeHandler}
      />
      </div>
      {checkedValue === "delivery" ? (
        <>
          <Select
            label="Выберите страну:"
            name="country"
            id="country"
            value={country}
            required
            handler={handleCountryChange}
          />
          <Input
            label="Город:"
            type="text"
            name="city"
            id="city"
            value={inputValue.city}
            placeholder="Введите Город"
            handler={handleChange}
          />
            <Input
            label="Индекс:"
            type="text"
            name="zipcode"
            id="zipcode"
            value={inputValue.zipcode}
            placeholder="Введите Индекс"
            handler={handleChange}
          />
          <Input label="Выберите дату:" type="date" id="date" name="date" value={inputValue.date} handler={handleChange} />
          <TextInput label="Введите ваш комментарий" id="comment" name="comment" value={inputValue.comment} placeholder="Введите ваш комментарий" handler={handleChange} />
        </>
      ) : (
          <TextInput label="Введите ваш комментарий" id="comment" name="comment" value={inputValue.comment} placeholder="Введите ваш комментарий" handler={handleChange} />
      )}

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

export default DeliveryInfoForm;
