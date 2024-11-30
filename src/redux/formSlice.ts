import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
  [key: string]: string | number | boolean | undefined;
}

interface FormState {
  formData: FormData;
}

const initialState: FormState = {
  formData: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
    updateFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { setFormData, updateFormData } = formSlice.actions;
export default formSlice.reducer;
