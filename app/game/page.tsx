"use client";

import { useGame } from "@/features/game/hooks/use-game";
import { Answer, AnswerVariant } from "@/features/game/ui/answer";
import { PrizeProgressSection } from "@/features/game/ui/prize-progress-section";
import { getLetterByIndex } from "@/features/game/model/utils";

import styles from "./page.module.css";
import { useCallback, useMemo } from "react";

const DEFAULT_VARIANT = AnswerVariant.Default;

export default function GamePage() {
  const { currentQuestion, answer, selectedOptionIndexes, reveal } = useGame();

  const variantConditionsMap = useMemo(
    () => ({
      [AnswerVariant.Correct]: (optionIndex: number) =>
        reveal && currentQuestion?.answers.includes(optionIndex),
      [AnswerVariant.Wrong]: (optionIndex: number) =>
        reveal && selectedOptionIndexes.includes(optionIndex),
      [AnswerVariant.Selected]: (optionIndex: number) =>
        !reveal && selectedOptionIndexes.includes(optionIndex),
    }),
    [reveal, currentQuestion, selectedOptionIndexes],
  );

  const getVariant = useCallback(
    (optionIndex: number) => {
      return (
        (Object.entries(variantConditionsMap).find(([_, condition]) =>
          condition(optionIndex),
        )?.[0] as AnswerVariant) || DEFAULT_VARIANT
      );
    },
    [variantConditionsMap],
  );

  const handleSelect = useCallback(
    (optionIndex: number) => {
      answer(optionIndex);
    },
    [answer],
  );

  return (
    <main className={styles.page}>
      <section className={styles.gameWrapper}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>{currentQuestion?.text}</h1>
        </div>
        <div className={styles.answers}>
          {currentQuestion?.options.map((opt, i) => {
            const letter = getLetterByIndex(i);
            const variant = getVariant(i);
            return (
              <Answer
                key={opt}
                answer={opt}
                prefix={letter}
                variant={variant}
                onSelect={handleSelect}
                index={i}
              />
            );
          })}
        </div>
      </section>
      <PrizeProgressSection />
    </main>
  );
}
