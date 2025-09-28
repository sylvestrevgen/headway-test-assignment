import { useSelector } from "react-redux";

import {
  selectSortedQuestionsPrizes,
  selectGameActiveQuestionId,
  selectPreviousQuestionIds,
} from "@/features/game/model/selectors";
import { PrizeItem, PrizeItemVariant } from "@/features/game/ui/prize-item";

import styles from "./prize-progress.module.css";

export function PrizeProgress() {
  const prizes = useSelector(selectSortedQuestionsPrizes);
  const currentQuestionId = useSelector(selectGameActiveQuestionId);
  const previousQuestionIds = useSelector(selectPreviousQuestionIds);

  const getVariant = (prize: { questionId: number }) => {
    const isActive = currentQuestionId === prize.questionId;
    const isFinished = previousQuestionIds.includes(prize.questionId);
    if (isFinished) return PrizeItemVariant.Finished;
    if (isActive) return PrizeItemVariant.Active;
    return PrizeItemVariant.Default;
  };

  return (
    <div className={styles.root}>
      {prizes.map((prize) => {
        return (
          <PrizeItem
            key={prize.prize}
            prize={prize.prize}
            variant={getVariant(prize)}
          />
        );
      })}
    </div>
  );
}
