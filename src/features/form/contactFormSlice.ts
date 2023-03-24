import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  firstName: string;
  lastName: string;
  tel: string;
  email: string;
  country: string;
  city: string;
  zipcode: string;
  comment: string;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  tel: "",
  email: "",
  country: "",
  city: "",
  zipcode: "",
  comment: "",
};

export const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateContactInfo: (state, action: PayloadAction<any>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.tel = action.payload.tel;
      state.email = action.payload.email;
      console.log("state", state.lastName, state.firstName);
      console.log("payload", action.payload);
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.zipcode = action.payload.zipcode;
      state.comment = action.payload.comment;
    }
  },
});

export const { updateContactInfo } = FormSlice.actions;
export default FormSlice.reducer;
