import { useState } from "react";
import Image from "next/image";

import { PrizeProgress } from "@/features/game/ui/prize-progress";

import styles from "./prize-progress-section.module.css";

export function PrizeProgressSection() {
  const [open, setOpen] = useState(false);

  const content = (
    <section className={styles.root}>
      <PrizeProgress />
    </section>
  );

  return (
    <>
      <button
        className={styles.menuButton}
        type="button"
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        {open ? (
          <Image src="/close.svg" alt="My Icon" width={24} height={24} />
        ) : (
          <Image src="/menu.svg" alt="My Icon" width={24} height={24} />
        )}
      </button>
      <div className={styles.mobileContent} aria-hidden={!open}>
        {content}
      </div>
      <div className={styles.desktopContent}>{content}</div>
    </>
  );
}
