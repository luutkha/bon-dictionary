import { createAsyncThunk } from "@reduxjs/toolkit";
import { splashCardService } from "../services/splash-card.service";

const getDataFromJson = createAsyncThunk(
  "splashCardToeic",
  async (_, { rejectWithValue }) => {
    try {
      const response = await splashCardService.getDataFromToeicFileAction();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const splashCardAction = {
  getDataFromJson,
};
