"use client";

import Link from "next/link";
import { useGame } from "@/features/game/hooks/use-game";
import styles from "./page.module.css";
import { Button } from "@/shared/ui/button";

export default function StartPage() {
  const { start } = useGame();

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.page}>
        <div className={styles.imageWrapper}>
          <div className={styles.image} />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <h1 className={styles.title}>Who wants to be a millionaire?</h1>
            <Link href="/game" className={styles.link} onClick={start}>
              <Button type="button">Start</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
