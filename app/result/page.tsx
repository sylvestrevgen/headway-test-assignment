"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useGame } from "@/features/game/hooks/use-game";
import { Button } from "@/shared/ui/button";

import styles from "./page.module.css";

export default function ResultPage() {
  const { earned, start } = useGame();

  const [earnedValue, setEarnedValue] = useState(0);

  // Make local state initiating to avoid zero earned blinking on "try again" action
  useEffect(() => {
    if (!earned) return;
    setEarnedValue(earned);
  }, [earned]);

  return (
    <main className={styles.page}>
      <div className={styles.imageWrapper}>
        <div className={styles.image} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <span className={styles.caption}>Total score</span>
            <h1 className={styles.title}>${earnedValue} earned</h1>
          </div>
          <Link href="/game" className={styles.link} onClick={start}>
            <Button type="button">Try again</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
