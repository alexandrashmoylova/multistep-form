import { AnyAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ContactInfo {
  firstName: string;
  lastName: string;
  tel: string;
  email: string;
}

export interface DeliveryInfo {
  delivery: string;
  country: string;
  city: string;
  zipcode: string;
  address: string;
  comment: string;
  date: string;
}

export interface FormState {
  FormStage: number;
  FormContactInfo: ContactInfo;
  FormDeliveryInfo: DeliveryInfo;
}

const initialState: FormState = {
  FormStage: 1,
  FormContactInfo: {
    firstName: "",
    lastName: "",
    tel: "",
    email: "",
  },
  FormDeliveryInfo: {
    delivery: "delivery",
    country: "Россия",
    city: "",
    zipcode: "",
    address: "",
    date: "",
    comment: "",
  },
};

export const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formStage: (state, action: PayloadAction<any>) => {
      state.FormStage = action.payload;
    },
    formInfo: (state, action: PayloadAction<any>) => {
      state.FormContactInfo = action.payload;
      // console.log('state', state.FormContactInfo.firstName);
      // console.log('state', state.FormContactInfo.lastName);
      // console.log('state', state.FormContactInfo.tel);
      // console.log('state', state.FormContactInfo.email);
    },
    formDelivery: (state, action: PayloadAction<any>) => {
      state.FormDeliveryInfo = action.payload;
      // console.log('state', state.FormDeliveryInfo.delivery);
      // console.log('state', state.FormDeliveryInfo.country);
      // console.log('state', state.FormDeliveryInfo.city);
      // console.log('state', state.FormDeliveryInfo.zipcode);
      // console.log('state', state.FormDeliveryInfo.comment);
      // console.log('state', state.FormDeliveryInfo.date);
    },
  },
});

export const { formStage, formInfo, formDelivery } = FormSlice.actions;
export const reducer = FormSlice.reducer;
