import styles from "./answer.module.css";

export enum AnswerVariant {
  Default = "default",
  Selected = "selected",
  Correct = "correct",
  Wrong = "wrong",
}

type AnswerProps = {
  answer: string;
  prefix?: string;
  variant?: AnswerVariant;
  onSelect: (index: number) => void;
  index: number;
};

export function Answer(props: AnswerProps) {
  const {
    answer,
    prefix,
    variant = AnswerVariant.Default,
    onSelect,
    index,
  } = props;
  return (
    <button
      className={`${styles.root} ${styles[variant]}`}
      onClick={() => onSelect(index)}
    >
      <hr className={styles.line} />
      <div className={styles.answer}>
        <div className={styles.triangleLeft} />
        <div className={styles.triangleRight} />
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <span className={styles.answerText}>{answer}</span>
      </div>
      <hr className={styles.line} />
    </button>
  );
}
