import Link from "next/link";
import styles from "./ProductDetailExplore.module.css";

interface ExploreSuiteCard {
  tag: string;
  title: string;
  description: string;
  url: string;
}

interface ExploreSuiteProps {
  data: {
    heading: string;
    cards: ExploreSuiteCard[];
  };
}

export default function ProductDetailExplore({ data }: ExploreSuiteProps) {
  if (!data || !data.cards || data.cards.length === 0) return null;

  return (
    <section className={styles.exploreSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{data.heading}</h2>

        <div className={styles.cardsGrid}>
          {data.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <span className={styles.tag}>{card.tag}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
              <div className={styles.cardFooter}>
                <Link href={card.url} className={styles.readMoreBtn}>
                  Read More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
