import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/providers/store";
import { questionsApi } from "./questions-api";

export const selectGame = (state: RootState) => state.game;
export const selectQuestions = questionsApi.endpoints.getQuestions.select();
export const selectGameActiveQuestionId = createSelector(
  [selectGame],
  (game) => game.activeQuestionId,
);

export const selectGameStatus = createSelector(
  [selectGame],
  (game) => game.status,
);

export const selectSelectedOptionIndexes = createSelector(
  [selectGame],
  (game) => game.selectedOptionIndexes,
);

export const selectRevealAnswers = createSelector(
  [selectGame],
  (game) => game.revealAnswers,
);

export const selectCurrentQuestion = createSelector(
  [selectGame, selectQuestions],
  (game, { data: questions }) => {
    if (!questions || game.activeQuestionId == null) return null;
    return questions.find((q) => q.id === game.activeQuestionId) || null;
  },
);

export const selectEarned = createSelector(
  [selectGame, selectQuestions],
  (game, { data: questions }) => {
    if (!questions) return 0;

    if (game.status !== "ended") return 0;

    const idx = questions.findIndex((q) => q.id === game.activeQuestionId);

    if (idx === -1) return 0;
    if (idx === questions.length - 1) {
      return questions[idx].prize;
    }
    return idx > 0 ? questions[idx - 1].prize : 0;
  },
);

export const selectQuestionsPrizes = createSelector(
  [selectQuestions],
  ({ data: questions }) =>
    questions?.map((q) => ({
      prize: q.prize,
      questionId: q.id,
    })) || [],
);

export const selectSortedQuestionsPrizes = createSelector(
  [selectQuestionsPrizes],
  (prizes) => prizes.sort((a, b) => b.prize - a.prize),
);

export const selectNextQuestionIds = createSelector(
  [selectQuestions, selectGameActiveQuestionId],
  ({ data: questions }, activeQuestionId) => {
    if (!questions || !activeQuestionId) return [];
    const idx = questions.findIndex((q) => q.id === activeQuestionId);
    return questions.slice(idx + 1).map((q) => q.id);
  },
);

export const selectPreviousQuestionIds = createSelector(
  [selectQuestions, selectGameActiveQuestionId],
  ({ data: questions }, activeQuestionId) => {
    if (!questions || !activeQuestionId) return [];
    const idx = questions.findIndex((q) => q.id === activeQuestionId);
    return questions.slice(0, idx).map((q) => q.id);
  },
);
