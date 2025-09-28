import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "./types";
import { GameStatus } from "./constants";

const initialState: GameState = {
  activeQuestionId: null,
  status: GameStatus.Idle,
  selectedOptionIndexes: [],
  revealAnswers: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<{ firstQuestionId: number }>) => {
      state.status = GameStatus.Started;
      state.activeQuestionId = action.payload.firstQuestionId;
      state.selectedOptionIndexes = [];
      state.revealAnswers = false;
    },
    nextQuestion: (
      state,
      action: PayloadAction<{ nextQuestionId: number | null }>,
    ) => {
      if (action.payload.nextQuestionId) {
        state.activeQuestionId = action.payload.nextQuestionId;
        state.selectedOptionIndexes = [];
        state.revealAnswers = false;
      } else {
        state.status = GameStatus.Ended;
      }
    },
    endGame: (state) => {
      state.status = GameStatus.Ended;
    },
    toggleSelectOption: (
      state,
      action: PayloadAction<{ optionIndex: number }>,
    ) => {
      const idx = state.selectedOptionIndexes.indexOf(
        action.payload.optionIndex,
      );
      if (idx === -1) {
        state.selectedOptionIndexes.push(action.payload.optionIndex);
      } else {
        state.selectedOptionIndexes.splice(idx, 1);
      }
    },
    setRevealAnswers: (state, action: PayloadAction<{ reveal: boolean }>) => {
      state.revealAnswers = action.payload.reveal;
    },
    clearSelection: (state) => {
      state.selectedOptionIndexes = [];
      state.revealAnswers = false;
    },
    restartGame: () => initialState,
  },
});

export const {
  startGame,
  nextQuestion,
  endGame,
  restartGame,
  toggleSelectOption,
  clearSelection,
  setRevealAnswers,
} = gameSlice.actions;
export default gameSlice.reducer;
