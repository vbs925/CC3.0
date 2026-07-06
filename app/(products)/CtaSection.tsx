import React from "react";
import styles from "./CtaSection.module.css";

interface CtaSectionProps {
  data: {
    heading: string;
    description: string;
    buttonLabel: string;
    buttonUrl: string;
  };
}

export default function CtaSection({ data }: CtaSectionProps) {
  if (!data) return null;

  return (
    <section className={styles.section} id="cta">
      <div className={styles.container}>
        <h2 className={styles.heading}>{data.heading}</h2>
        <p className={styles.description}>{data.description}</p>
        <a href={data.buttonUrl} className={styles.ctaBtn}>
          {data.buttonLabel}
        </a>
      </div>
    </section>
  );
}
