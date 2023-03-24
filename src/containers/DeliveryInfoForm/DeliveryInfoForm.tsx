import * as React from "react";
import Input from "../../components/Input/Input";
import RadioButton from "../../components/RadioButton/RadioButton";
import Select from "../../components/Select/Select";
import type { DeliveryFormState } from "../../features/form/deliveryFormSlice"

type DeliveryInfoFormProps = {
  handler: (e: any) => void,
}

const DeliveryInfoForm: React.FC<DeliveryInfoFormProps>  = ({
  handler
}) => {
  const deliveryData: DeliveryFormState = {
    country: "",
    city: "",
    zipcode: "",
    comment: "",
  }
  const [inputValue, setInputValue] = React.useState(deliveryData);

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
    <form action="" onSubmit={(e)=>handler(e)}>
      <RadioButton
        label="Доставка"
        type="radio"
        id="delivery"
        value="delivery"
        isSelected={checkedValue === "delivery"}
        changed={radioChangeHandler}
      />
      <RadioButton
        label="Самовывоз"
        type="radio"
        id="pickup"
        value="pickup"
        isSelected={checkedValue === "pickup"}
        changed={radioChangeHandler}
      />
      {checkedValue === "delivery" ? (
        <div>
          <Select
            label="Выберите страну"
            name="country"
            id="country"
            value="country"
            required
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
          <input type="date" />
          <div>
            <textarea name="comment" id="comment"></textarea>
          </div>
        </div>
      ) : (
        <div>
          <textarea name="comment" id="comment"></textarea>
        </div>
      )}

      <button type="submit">Оформить заказ</button>
    </form>
  );
};

export default DeliveryInfoForm;
