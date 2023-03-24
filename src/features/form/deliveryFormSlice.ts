import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DeliveryFormState {
  country: string;
  city: string;
  zipcode: string;
  comment: string;
}
const initialState: DeliveryFormState = {
  country: "",
  city: "",
  zipcode: "",
  comment: "",
};

export const deliveryFormSlice = createSlice({
  name: "deliveryForm",
  initialState,
  reducers: {
    updateDeliveryInfo: (state, action: PayloadAction<any>) => {
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.zipcode = action.payload.zipcode;
      state.comment = action.payload.comment;
    }
  },
});

export const { updateDeliveryInfo } = deliveryFormSlice.actions;
export default deliveryFormSlice.reducer;
