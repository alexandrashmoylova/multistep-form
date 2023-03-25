import * as React from "react";
import "./DeliveryInfoForm.scss"
import Input from "../../components/Input/Input";
import RadioButton from "../../components/RadioButton/RadioButton";
import Select from "../../components/Select/Select";
import TextInput from "../../components/TextInput/TextInput"

type DeliveryInfoFormProps = {
  handler: (e: any) => void,
}

const DeliveryInfoForm: React.FC<DeliveryInfoFormProps>  = ({
  handler
}) => {
  const [inputValue, setInputValue] = React.useState({
    country: "",
    city: "",
    zipcode: "",
    comment: "",
    date: "",
  });

  const [country, setCountry] = React.useState("");
  console.log(country);

  const handleCountryChange = (e: any): void => {
    const value = e.currentTarget.value;
    setCountry(value);
    console.log("targetName", e.target.name);
  };


  const [checkedValue, setChekedValue] = React.useState("delivery");
  const radioChangeHandler = (e: any) => {
    setChekedValue(e.target.value);
  };

  const handleChange = (e: any): void => {
    const value = e.currentTarget.value;
    setInputValue({ ...inputValue, [e.target.name]: value });
    console.log("targetName", e.target.name);
  };

  return (
    <form className="form" action="" onSubmit={(e)=>handler(e)}>
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

      <button className="button" type="submit">Оформить заказ</button>
    </form>
  );
};

export default DeliveryInfoForm;
