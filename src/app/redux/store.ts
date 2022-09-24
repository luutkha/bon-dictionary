import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import splashCardReducer from "../redux/slice/splash-card.slice";
import { useAppSelector } from "./hooks";
export const store = configureStore({
  reducer: {
    splashCard: splashCardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useSplashCardStore = () =>
  useAppSelector((state: RootState) => state.splashCard);
