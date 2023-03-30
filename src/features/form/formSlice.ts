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
    },
    formDelivery: (state, action: PayloadAction<any>) => {
      state.FormDeliveryInfo = action.payload;
    },
    clearDeliveryForm: (state) => {
      state.FormDeliveryInfo = initialState.FormDeliveryInfo;
    },
  },
});

export const { formStage, formInfo, formDelivery, clearDeliveryForm } = FormSlice.actions;
export const reducer = FormSlice.reducer;
