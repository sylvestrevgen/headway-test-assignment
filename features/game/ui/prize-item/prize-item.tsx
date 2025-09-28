import styles from "./prize-item.module.css";

export enum PrizeItemVariant {
  Default = "default",
  Active = "active",
  Finished = "finished",
}

type PrizeItemProps = {
  prize: number;
  variant?: PrizeItemVariant;
};

export function PrizeItem(props: PrizeItemProps) {
  const { prize, variant = PrizeItemVariant.Default } = props;

  return (
    <div className={`${styles.root} ${styles[variant]}`}>
      <hr className={styles.line} />
      <div className={styles.prizeWrapper}>
        <div className={styles.triangleLeft} />
        <div className={styles.triangleRight} />
        <p className={styles.prize}>${prize}</p>
      </div>
      <hr className={styles.line} />
    </div>
  );
}
