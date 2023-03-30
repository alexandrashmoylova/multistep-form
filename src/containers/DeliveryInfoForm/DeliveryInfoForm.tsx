import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DeliveryInfoForm.scss";
import Input from "../../components/Input/Input";
import RadioButton from "../../components/RadioButton/RadioButton";
import Select from "../../components/Select/Select";
import TextInput from "../../components/TextInput/TextInput";
import type { RootState } from "../../store";
import { formStage, formDelivery, clearDeliveryForm } from "../../features/form/formSlice";
import { postData } from "../../api/connection";

type DeliveryInfoFormProps = {
  submitButtonText: string;
  prevButton: boolean;
};

const DeliveryInfoForm: React.FC<DeliveryInfoFormProps> = ({
  submitButtonText,
  prevButton,
}) => {
  const dispatch = useDispatch();

  const initialErrors = {
    country: "",
    city: "",
    zipcode: "",
    address: "",
    date: "",
  };

  const currentStage = useSelector((state: RootState) => state.FormStage); // for previous button
  const formstageDelivery = useSelector(
    (state: RootState) => state.FormDeliveryInfo.delivery
  );
  const formstageCountry = useSelector(
    (state: RootState) => state.FormDeliveryInfo.country
  );
  const formstageCity = useSelector(
    (state: RootState) => state.FormDeliveryInfo.city
  );
  const formstageZipcode = useSelector(
    (state: RootState) => state.FormDeliveryInfo.zipcode
  );
  const formstageAdress = useSelector(
    (state: RootState) => state.FormDeliveryInfo.address
  );
  const formstageComment = useSelector(
    (state: RootState) => state.FormDeliveryInfo.comment
  );
  const formstageDate = useSelector(
    (state: RootState) => state.FormDeliveryInfo.date
  );

  const formInfoState = useSelector(
    (state: RootState) => state.FormContactInfo
  );

  const [checkedValue, setChekedValue] = useState(formstageDelivery);


  const [inputValue, setInputValue] = useState({
    delivery: formstageDelivery,
    country: formstageCountry,
    city: formstageCity,
    zipcode: formstageZipcode,
    address: formstageAdress,
    date: formstageDate,
    comment: formstageComment,
  });
  // console.log(inputValue);

  const [errors, setErrors] = useState(initialErrors);

  const [country, setCountry] = useState(formstageCountry);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const radioChangeHandler = (e: any) => {
    const value = e.currentTarget.value;
    setChekedValue(value);
    setInputValue({ ...inputValue, delivery: value });
  };

  const handleCountryChange = (e: any): void => {
    const value = e.target.value;
    setCountry(value);
    setInputValue({ ...inputValue, country: value });
  };

  const handleChange = (e: any): void => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const validate = (inputValue: any) => {
    let formErrors = {
      country: "",
      city: "",
      zipcode: "",
      address: "",
      date: "",
    };
    // console.log("formErrors", formErrors);

    if (!inputValue.country) {
      formErrors.country = "Страна обязательно";
    }

    if (!inputValue.city) {
      formErrors.city = "Город обязательно";
    }

    if (inputValue.zipcode.length < 6) {
      formErrors.zipcode = "Минимум 6 цифр";
    }

    if (!inputValue.zipcode) {
      formErrors.zipcode = "Индекс обязательно";
    }

    if (!inputValue.address) {
      formErrors.address = "Адрес обязательно";
    }

    if (!inputValue.date) {
      formErrors.date = "Дата обязательно";
    }

    return formErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors(validate(inputValue));
    setIsSubmitted(true);
  };

  const clearForm = () => {
    dispatch(
      formStage(currentStage - 1),
    )
    dispatch(clearDeliveryForm());  
  }

  useEffect(() => {
    // console.log("errors", errors);
    // console.log("object.values", Object.values(errors));
    dispatch(
      formDelivery({
        delivery: inputValue.delivery,
        country: inputValue.country,
        city: inputValue.city,
        zipcode: inputValue.zipcode,
        address: inputValue.address,
        date: inputValue.date,
        comment: inputValue.comment,
      })
    );

    const userData = {
      ...formInfoState,
      ...inputValue,
    };

    const fetchData = async () => {
      try {
        await postData(userData);
        dispatch(formStage(3));
      } catch (err) {
        console.log(err);
        dispatch(formStage(4));
      }
    };

    if (Object.values(errors).every((el) => el === "" && isSubmitted)) {
      fetchData();
    }

    if (inputValue.delivery === "pickup" && isSubmitted) {
      Object.values(errors).forEach((el) => el === "");
      fetchData();
    }
  }, [inputValue, isSubmitted, dispatch, errors]);

  return (
    <form noValidate={true} className="form" action="" onSubmit={handleSubmit}>
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
          <div className="form-wrapper-input">
            <Select
              label="Выберите страну:"
              name="country"
              id="country"
              value={country}
              required
              handler={handleCountryChange}
            />
            {errors.country && (
              <span className="error-message">{errors.country}</span>
            )}
          </div>
          <div className="form-wrapper-input">
            <Input
              label="Город:"
              type="text"
              name="city"
              id="city"
              value={inputValue.city}
              required
              placeholder="Введите Город"
              handler={handleChange}
            />
            {errors.city && (
              <span className="error-message">{errors.city}</span>
            )}
          </div>
          <div className="form-wrapper-input">
            <Input
              label="Индекс:"
              type="text"
              name="zipcode"
              id="zipcode"
              value={inputValue.zipcode}
              required
              placeholder="Введите Индекс"
              handler={handleChange}
            />
            {errors.zipcode && (
              <span className="error-message">{errors.zipcode}</span>
            )}
          </div>
          <div className="form-wrapper-input">
            <Input
              label="Адрес:"
              type="text"
              name="address"
              id="address"
              value={inputValue.address}
              required
              placeholder="Введите Адрес"
              handler={handleChange}
            />
            {errors.address && (
              <span className="error-message">{errors.address}</span>
            )}
          </div>
          <div className="form-wrapper-input">
            <Input
              label="Выберите дату:"
              type="date"
              id="date"
              name="date"
              value={inputValue.date}
              required
              handler={handleChange}
            />
            {errors.date && (
              <span className="error-message">{errors.date}</span>
            )}
          </div>
          <div className="form-wrapper-input">
            <TextInput
              label="Введите ваш комментарий"
              id="comment"
              name="comment"
              value={inputValue.comment}
              placeholder="Напишите здесь что-нибудь"
              handler={handleChange}
            />
          </div>
        </>
      ) : (
        <div className="form-wrapper-input">
          <TextInput
            label="Введите ваш комментарий"
            id="comment"
            name="comment"
            value={inputValue.comment}
            placeholder="Напишите здесь что-нибудь"
            handler={handleChange}
          />
        </div>
      )}

      <div className="form__btn-wrapper">
        {prevButton && (
          <input
            className="button button-back"
            type="submit"
            value={`Назад`}
            onClick={clearForm}
          />
        )}
        <input className="button" type="submit" value={submitButtonText} />
      </div>
    </form>
  );
};

export default DeliveryInfoForm;
