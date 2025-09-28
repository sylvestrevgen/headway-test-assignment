import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  startGame,
  nextQuestion,
  endGame,
  restartGame,
  toggleSelectOption,
  setRevealAnswers,
} from "@/features/game/model/slice";
import {
  selectCurrentQuestion,
  selectEarned,
  selectGameActiveQuestionId,
  selectGameStatus,
  selectRevealAnswers,
  selectSelectedOptionIndexes,
} from "@/features/game/model/selectors";
import { useGetQuestionsQuery } from "@/features/game/model/questions-api";
import { GameStatus } from "@/features/game/model/constants";

export const useGame = () => {
  const dispatch = useDispatch();
  const { questions, isQuestionsLoading, isQuestionsError } =
    useGetQuestionsQuery(undefined, {
      selectFromResult: ({ data, isLoading, isError }) => ({
        questions: data || [],
        isQuestionsLoading: isLoading,
        isQuestionsError: isError,
      }),
    });

  const router = useRouter();
  const pathname = usePathname();

  const status = useSelector(selectGameStatus);
  const activeQuestionId = useSelector(selectGameActiveQuestionId);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const earned = useSelector(selectEarned);
  const selectedOptionIndexes = useSelector(selectSelectedOptionIndexes);
  const reveal = useSelector(selectRevealAnswers);

  // Guard: if game not started and not on start route, redirect to start
  useEffect(() => {
    if (status === GameStatus.Idle && pathname !== "/") {
      router.replace("/");
    }
  }, [status, pathname, router]);

  const handleEndGame = useCallback(() => {
    router.replace("/result");
    dispatch(endGame());
  }, [router, dispatch]);

  const start = useCallback(() => {
    if (questions.length > 0) {
      dispatch(startGame({ firstQuestionId: questions[0].id }));
    }
  }, [dispatch, questions]);

  const answer = useCallback(
    (optionIndex: number) => {
      if (!currentQuestion || reveal) return;

      const isSelected = selectedOptionIndexes.includes(optionIndex);
      const nextSelected = isSelected
        ? selectedOptionIndexes.filter((i) => i !== optionIndex)
        : [...selectedOptionIndexes, optionIndex];

      // Optimistically toggle selection in state
      dispatch(toggleSelectOption({ optionIndex }));

      const correctAnswers = Array.isArray(currentQuestion.answers)
        ? currentQuestion.answers
        : typeof (currentQuestion as unknown as { answer?: number }).answer ===
            "number"
          ? [
              (currentQuestion as unknown as { answer?: number })
                .answer as number,
            ]
          : [];

      const requiredCount = correctAnswers.length;

      if (requiredCount > 0 && nextSelected.length === requiredCount) {
        // Determine correctness (set equality)
        const sortedA = [...nextSelected].sort((a, b) => a - b);
        const sortedB = [...correctAnswers].sort((a, b) => a - b);
        const allCorrect =
          sortedA.length === sortedB.length &&
          sortedA.every((v, idx) => v === sortedB[idx]);

        // Reveal answers
        dispatch(setRevealAnswers({ reveal: true }));

        // After 2s, proceed
        window.setTimeout(() => {
          if (!currentQuestion) return;
          const currentIndex = questions.findIndex(
            (q) => q.id === currentQuestion.id,
          );
          if (allCorrect) {
            const next = questions[currentIndex + 1];
            if (next) {
              dispatch(nextQuestion({ nextQuestionId: next.id }));
            } else {
              // Completed last question
              handleEndGame();
            }
          } else {
            handleEndGame();
          }
        }, 2000);
      }
    },
    [
      currentQuestion,
      dispatch,
      handleEndGame,
      questions,
      reveal,
      selectedOptionIndexes,
    ],
  );

  const restart = useCallback(() => {
    dispatch(restartGame());
  }, [dispatch]);

  const useGameData = useMemo(
    () => ({
      status,
      activeQuestionId,
      currentQuestion,
      earned,
      selectedOptionIndexes,
      reveal,
      isLoading: isQuestionsLoading,
      isError: isQuestionsError,
      start,
      answer,
      restart,
    }),
    [
      status,
      activeQuestionId,
      currentQuestion,
      earned,
      selectedOptionIndexes,
      reveal,
      isQuestionsLoading,
      isQuestionsError,
      start,
      answer,
      restart,
    ],
  );

  return useGameData;
};
