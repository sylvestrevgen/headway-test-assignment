import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "@/features/game/model/slice";
import { questionsApi } from "@/features/game/model/questions-api";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(questionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
