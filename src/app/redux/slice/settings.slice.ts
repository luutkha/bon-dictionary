import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { splashCardAction } from "../action/splash-card.action";
const initialState: any = {
  currentListSplash: [],
};

export const settingsSlice = createSlice({
  name: "SplashCardSlice",
  initialState,
  reducers: {
    setCurrentListSplash: (state, action: PayloadAction<number>) => {},
  },
  extraReducers(builder) {
    builder.addCase(splashCardAction.getDataFromJson.pending, (state, _) => {
      state.listWords = [];
    });
    builder.addCase(
      splashCardAction.getDataFromJson.fulfilled,
      (state, action) => {
        state.listWords = action.payload;
      }
    );
    builder.addCase(splashCardAction.getDataFromJson.rejected, (state, _) => {
      state.listWords = [];
    });
  },
});

export const { setCurrentListSplash } = settingsSlice.actions;
export default settingsSlice.reducer;
